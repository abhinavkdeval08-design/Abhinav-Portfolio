/// <reference lib="webworker" />
import { PDFDocument } from "pdf-lib";

const ctx = self as unknown as DedicatedWorkerGlobalScope;

// Sanitize mobile scanner headers (CamScanner / phone scanners often insert bytes before '%PDF-')
function sanitizePdfBuffer(buf: Uint8Array): Uint8Array {
  for (let i = 0; i < Math.min(buf.length - 4, 1024); i++) {
    if (buf[i] === 0x25 && buf[i + 1] === 0x50 && buf[i + 2] === 0x44 && buf[i + 3] === 0x46) {
      return i === 0 ? buf : buf.subarray(i);
    }
  }
  return buf;
}

// In-memory lossless compression pipeline — strictly 0 network egress
ctx.onmessage = async (e: MessageEvent<ArrayBuffer>) => {
  try {
    const rawBytes = new Uint8Array(e.data);
    const cleanBytes = sanitizePdfBuffer(rawBytes);

    const doc = await PDFDocument.load(cleanBytes, {
      updateMetadata: false,
      ignoreEncryption: false,
    });

    // Prune privacy metadata objects
    doc.setTitle("");
    doc.setAuthor("");
    doc.setSubject("");
    doc.setKeywords([]);
    doc.setProducer("");
    doc.setCreator("");

    // Repack binary object streams
    const compressedBytes = await doc.save({ useObjectStreams: true });
    ctx.postMessage({ ok: true, bytes: compressedBytes });
  } catch (err) {
    ctx.postMessage({ ok: false, error: String(err) });
  }
};
