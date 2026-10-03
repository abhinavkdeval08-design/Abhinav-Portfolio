import { PDFDocument } from "pdf-lib";

// Runs entirely off the main thread. No fetch, no XHR, no network.
self.onmessage = async (e: MessageEvent<ArrayBuffer>) => {
  try {
    const doc = await PDFDocument.load(e.data, { updateMetadata: false });
    doc.setTitle(""); doc.setAuthor(""); doc.setSubject("");
    doc.setKeywords([]); doc.setProducer(""); doc.setCreator("");
    const bytes = await doc.save({ useObjectStreams: true });
    (self as unknown as Worker).postMessage({ ok: true, bytes });
  } catch (err) {
    (self as unknown as Worker).postMessage({ ok: false, error: String(err) });
  }
};
