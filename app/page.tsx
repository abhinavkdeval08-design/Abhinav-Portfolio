"use client";

import { useState, useEffect, useRef, useCallback, useMemo, MouseEvent, ReactNode, memo } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  Code2, Trophy, Mail, ExternalLink, GitPullRequest, Flame, Cpu, Server, Layers, Flag,
  Terminal, Compass, Info, Check, Copy, Clock, MapPin, ShieldCheck, Radio, Search, UploadCloud, Download, Command,
} from "lucide-react";

/* ---------- Brand icons ---------- */
const GithubIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedinIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

/* ---------- Data ---------- */
const GH = "https://github.com/abhinavkdeval08-design";
const LINKS = {
  github: GH,
  leetcode: "https://leetcode.com/u/abhinav_deval07/",
  codeforces: "https://codeforces.com/profile/abhinavkdeval29",
  codolio: "https://codolio.com/profile/Abhinavdeval07",
  linkedin: "https://linkedin.com/in/abhinavdeval",
  email: "abhinavkdeval08@gmail.com",
  gssoc: "https://gssoc.girlscript.org/profile/2405e152-7589-4372-8564-14bec86302c8",
  enclaveDemo: "https://enclave-pdf.vercel.app",
  enclaveRepo: `${GH}/EnclavePDF`,
  vibrodoRepo: `${GH}/vibrodo`,
  pr1659: "https://github.com/layer5io/sistent/pull/1659",
  pr1660: "https://github.com/layer5io/sistent/pull/1660",
  pr22149: "https://github.com/meshery/meshery/pull/22149",
};

const socials = [
  { label: "GitHub", href: LINKS.github, icon: GithubIcon },
  { label: "LeetCode", href: LINKS.leetcode, icon: Code2 },
  { label: "Codeforces", href: LINKS.codeforces, icon: Trophy },
  { label: "Codolio", href: LINKS.codolio, icon: Flame },
  { label: "LinkedIn", href: LINKS.linkedin, icon: LinkedinIcon },
];

const badges = ["IIIT Kalyani '29", "CNCF Ecosystem Contributor", "GSSoC '26 Global Rank #111 (Top 1%)", "LeetCode 1,590+ (112+ Day Streak)", "Codeforces Pupil (1,274)"];
const metrics = [
  { v: "1,590", u: "", l: "LC Rating & CF Pupil (1,274)", s: "11 Official Contests Attended (5 Codeforces, 5 LeetCode, 1 AtCoder). Peak trajectory with 0-penalty contest performances." },
  { v: "355+", u: "solved", l: "Problems Solved", s: "Algorithmic coverage across LeetCode, Codeforces, and GFG (verified via Codolio).", bar: true },
  { v: "112+", u: "days", l: "Continuous Days Streak", s: "176 total active days with unbroken problem-solving consistency. 100-Days Badge 2026." },
  { v: "#111", u: "/ 47,926", l: "GSSoC '26 Top 1% (A-Tier)", s: "24,517 total points, 13/13 weeks unbroken streak. 34 PRs merged across 9 repos (13 badges earned)." },
];

const arsenal = [
  { t: "Languages", i: ["Modern C++", "TypeScript", "JavaScript", "C", "SQL"] },
  { t: "Frontend & Runtimes", i: ["React", "React Native", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Web Workers", "HTML5 Canvas"] },
  { t: "Backend & Infra", i: ["Node.js", "Express", "WebSockets", "Redis", "Docker (Basics)", "Git/GitHub CI/CD"] },
  { t: "Algorithmic Strengths", i: ["Dynamic Programming (36+)", "Graphs/Trees", "Shortest Path & DSU", "Binary Search on Answer", "Monotonic Stacks", "Codeforces Div. 2/3"] },
];

const marquee = ["C++", "TypeScript", "React", "React Native", "Next.js", "HTML", "CSS", "Web Workers", "WebSockets", "Redis", "Celery", "Node.js", "Docker", "pdf-lib", "Tailwind", "CNCF", "Meshery"];

const glance = [
  { k: "Status", v: "Open to internships, 2026–27" },
  { k: "Studying", v: "B.Tech ECE, IIIT Kalyani '29" },
  { k: "Focus", v: "Systems & cloud-native" },
  { k: "Based in", v: "Kalyani, West Bengal (IST)" },
];

/* ---------- Helpers ---------- */
async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
  }
}

const MAX_BYTES = 20 * 1024 * 1024;
const egressSince = (from: number) => {
  const f = (performance.getEntriesByType("resource") as PerformanceResourceTiming[]).slice(from);
  return { req: f.length, bytes: f.reduce((n, r) => n + r.transferSize, 0) };
};
const fmt = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(2)} MB` : `${(b / 1024).toFixed(1)} KB`);
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10b981]";

/* ---------- Primitives ---------- */
function Card({ children, className = "", glow = false }: { children: ReactNode; className?: string; glow?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`); el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-colors duration-200 hover:border-zinc-600 ${glow ? "border-emerald-500/40 bg-zinc-950 shadow-[0_0_40px_-12px_rgba(16,185,129,0.35)]" : "border-zinc-800 bg-zinc-950"} ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(450px circle at var(--mx,-999px) var(--my,-999px), rgba(16,185,129,0.1), transparent 80%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md border border-[#38bdf8]/20 bg-[#38bdf8]/10 px-2 py-0.5 font-mono text-[11px] font-medium text-[#38bdf8]">{children}</span>
);

const Title = ({ icon: Icon, children }: { icon: typeof Cpu; children: ReactNode }) => (
  <h2 className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
    <Icon className="h-4 w-4 text-[#10b981]" aria-hidden="true" /> {children}
  </h2>
);

const Ext = ({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) => (
  <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={`${focusRing} ${className}`}>{children}</a>
);

const PR = ({ href, children }: { href: string; children: ReactNode }) => (
  <Ext href={href} className="inline-flex items-center gap-1 font-mono text-xs text-[#10b981] underline-offset-2 hover:underline">
    <GitPullRequest className="h-3 w-3" aria-hidden="true" />{children}
  </Ext>
);

function CopyEmail({ className, idle, done }: { className: string; idle: string; done: string }) {
  const [ok, setOk] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(t.current), []);
  return (
    <button type="button" aria-live="polite" className={`cursor-pointer ${focusRing} ${className}`}
      onClick={async () => { await copyText(LINKS.email); setOk(true); clearTimeout(t.current); t.current = setTimeout(() => setOk(false), 2000); }}>
      {ok ? <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      {ok ? done : idle}
    </button>
  );
}

const Clock_ = memo(function ClockDisplay() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs tabular-nums text-zinc-300">
      <Clock className="h-3 w-3 text-[#38bdf8]" aria-hidden="true" />
      <span className="inline-block min-w-[112px]" suppressHydrationWarning>{time ? `${time} IST` : "\u00A0"}</span>
    </span>
  );
});

/* ---------- Live EnclavePDF demo (real Web Worker + real measurements) ---------- */
type Result = { name: string; before: number; after: number; ms: number; req: number; egress: number; gap: number; url: string };

function LiveDemo() {
  const [st, setSt] = useState<"idle" | "run" | "done" | "err">("idle");
  const [res, setRes] = useState<Result | null>(null);
  const [msg, setMsg] = useState("");
  const [drag, setDrag] = useState(false);
  const [gen, setGen] = useState(false);
  const worker = useRef<Worker | null>(null);
  const url = useRef<string | undefined>(undefined);

  useEffect(() => {
    worker.current = new Worker(new URL("./compress.worker.ts", import.meta.url), { type: "module" });
    return () => { worker.current?.terminate(); if (url.current) URL.revokeObjectURL(url.current); };
  }, []);

  const run = useCallback(async (file: File) => {
    const w = worker.current;
    if (!w) return;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) { setSt("err"); setMsg(`"${file.name}" PDF nahi hai. Sirf .pdf file drop karo.`); return; }
    if (file.size > MAX_BYTES) { setSt("err"); setMsg(`File ${fmt(file.size)} hai. Limit 20 MB hai, isse chhoti PDF try karo.`); return; }
    setSt("run"); setMsg("");
    const reqStart = performance.getEntriesByType("resource").length;
    let last = performance.now(), gap = 0, raf = 0;
    const loop = (t: number) => { gap = Math.max(gap, t - last); last = t; raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const t0 = performance.now();
    let buf: ArrayBuffer;
    try { buf = await file.arrayBuffer(); }
    catch { cancelAnimationFrame(raf); setSt("err"); setMsg("File read nahi hui. Dobara try karo."); return; }
    w.onmessage = (e: MessageEvent<{ ok: boolean; bytes?: Uint8Array }>) => {
      cancelAnimationFrame(raf);
      if (!e.data.ok || !e.data.bytes) { setSt("err"); setMsg("PDF parse nahi hui (encrypted ya corrupt ho sakti hai)."); return; }
      if (url.current) URL.revokeObjectURL(url.current);
      url.current = URL.createObjectURL(new Blob([e.data.bytes as BlobPart], { type: "application/pdf" }));
      const net = egressSince(reqStart);
      setRes({ name: file.name, before: file.size, after: e.data.bytes.length, ms: performance.now() - t0, req: net.req, egress: net.bytes, gap, url: url.current });
      setSt("done");
    };
    w.onerror = () => { cancelAnimationFrame(raf); setSt("err"); setMsg("Worker fail hua."); };
    w.postMessage(buf);
  }, []);

  const sample = useCallback(async () => {
    setSt("run"); setMsg(""); setGen(true);
    try {
      const { PDFDocument, StandardFonts } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      doc.setTitle("EnclavePDF sample"); doc.setAuthor("Abhinav Deval"); doc.setProducer("sample-generator");
      const font = await doc.embedFont(StandardFonts.Helvetica);
      for (let p = 0; p < 60; p++) {
        const pg = doc.addPage([595, 842]);
        for (let l = 0; l < 45; l++) pg.drawText(`Page ${p + 1} · line ${l + 1} · in-browser compression sample`, { x: 40, y: 800 - l * 17, size: 10, font });
      }
      const bytes = await doc.save({ useObjectStreams: false });
      setGen(false);
      await run(new File([bytes as BlobPart], "sample-document.pdf", { type: "application/pdf" }));
    } catch {
      setGen(false); setSt("err"); setMsg("Sample PDF generate nahi ho paayi. Apni PDF drop karke dekho.");
    }
  }, [run]);

  const saved = res ? ((res.before - res.after) / res.before) * 100 : 0;
  const stats = res ? [
    { k: "Size", v: `${fmt(res.before)} → ${fmt(res.after)}`, s: saved >= 0 ? `${saved.toFixed(1)}% smaller` : "already optimized" },
    { k: "Worker time", v: `${Math.round(res.ms)} ms`, s: "end to end" },
    { k: "Longest frame", v: `${Math.round(res.gap)} ms`, s: "main thread stayed live" },
    { k: "Network egress", v: res.egress === 0 ? "0 B" : fmt(res.egress), s: `${res.req} requests · PerformanceResourceTiming`, tip: "Sum of transferSize for every resource this page fetched during the run, read from the browser's PerformanceResourceTiming API. The worker contains no fetch calls." },
  ] : [];

  return (
    <Card glow className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white"><ShieldCheck className="h-5 w-5 text-emerald-400" aria-hidden="true" /> Try EnclavePDF right here</h3>
        <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase text-emerald-400">Max 20 MB · In-Memory</span>
      </div>
      <p className="mt-1 max-w-2xl text-sm text-zinc-400">Drop a PDF. A Dedicated Web Worker prunes metadata and repacks objects in memory. The file never leaves this tab, and the numbers below are measured live.</p>

      <label onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) run(f); }}
        className={`mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-8 text-center transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-[#10b981] ${drag ? "border-emerald-400 bg-emerald-500/10" : "border-zinc-700 bg-zinc-900/50 hover:border-emerald-500/50"}`}>
        <UploadCloud className={`h-6 w-6 ${st === "run" ? "animate-pulse text-emerald-400" : "text-zinc-400"}`} aria-hidden="true" />
        <span className="font-mono text-sm text-zinc-300">{gen ? "generating sample…" : st === "run" ? "compressing in worker…" : "Drop a .pdf or click to choose"}</span>
        <input type="file" accept="application/pdf,.pdf" className="sr-only" disabled={st === "run"}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) run(f); e.target.value = ""; }} />
      </label>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button type="button" onClick={sample} disabled={st === "run"} className={`inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-200 transition-colors hover:border-emerald-500/50 hover:text-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}>
          Load sample PDF
        </button>
        <span className="text-[11px] text-zinc-500">No file handy? A 60-page unoptimized PDF is generated in your browser, then compressed.</span>
      </div>

      <div aria-live="polite">
        {st === "err" && <p role="alert" className="mt-3 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 font-mono text-xs text-rose-300">{msg}</p>}
        {st === "done" && res && (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {stats.map((x) => (
                <div key={x.k} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                  <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500">{x.k}{x.tip && <span tabIndex={0} title={x.tip} aria-label={x.tip} className={`cursor-help rounded ${focusRing}`}><Info className="h-3 w-3" aria-hidden="true" /></span>}</div>
                  <div className="mt-1 font-mono text-sm font-bold text-emerald-400">{x.v}</div>
                  <div className="text-[11px] text-zinc-500">{x.s}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a href={res.url} download={res.name.replace(/\.pdf$/i, "") + "-compressed.pdf"} className={`inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 ${focusRing}`}>
                <Download className="h-3.5 w-3.5" aria-hidden="true" /> Download result
              </a>
              <span className="text-[11px] text-zinc-500">Lossless structure pruning. Scanned PDFs need DPI downsampling (in the full app), so savings vary.</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ---------- ⌘K command palette ---------- */
function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const cmds = useMemo(() => [
    { l: "Jump to live demo", a: () => go("demo") }, { l: "Jump to metrics", a: () => go("metrics") },
    { l: "Jump to projects", a: () => go("projects") }, { l: "Jump to open source", a: () => go("oss") },
    { l: "Jump to contact", a: () => go("contact") }, { l: "Copy email", a: () => copyText(LINKS.email) },
    { l: "Send email", a: () => (window.location.href = `mailto:${LINKS.email}`) },
    ...socials.map((s) => ({ l: `Open ${s.label}`, a: () => window.open(s.href, "_blank", "noopener,noreferrer") })),
  ], []);
  const list = cmds.filter((c) => c.l.toLowerCase().includes(q.toLowerCase()));
  useEffect(() => { if (open) { setQ(""); setIdx(0); } }, [open]);
  const exec = (i: number) => { const c = list[i]; if (c) { onClose(); setTimeout(c.a, 50); } };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, list.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") exec(idx);
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[15vh]" onClick={onClose}>
          <motion.div initial={{ y: -8, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -8, scale: 0.98 }} role="dialog" aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 shadow-2xl" onClick={(e) => e.stopPropagation()} onKeyDown={onKey}>
            <div className="flex items-center gap-2 border-b border-zinc-800 px-3">
              <Search className="h-4 w-4 text-zinc-500" aria-hidden="true" />
              <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} placeholder="Type a command…" aria-label="Search commands"
                className="w-full bg-transparent py-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none" />
              <kbd className="rounded border border-zinc-700 px-1.5 font-mono text-[10px] text-zinc-500">esc</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-1.5">
              {list.length === 0 && <li className="px-3 py-6 text-center font-mono text-xs text-zinc-500">No match</li>}
              {list.map((c, i) => (
                <li key={c.l}>
                  <button type="button" onMouseEnter={() => setIdx(i)} onClick={() => exec(i)}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left font-mono text-xs ${i === idx ? "bg-emerald-500/15 text-emerald-300" : "text-zinc-300"}`}>{c.l}</button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Page ---------- */
export default function Page() {
  const [pal, setPal] = useState(false);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPal((p) => !p); } };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <style>{`
        @keyframes aurora{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(6%,8%,0) scale(1.15)}}
        @keyframes wave{0%,60%,100%{transform:rotate(0)}10%,30%{transform:rotate(14deg)}20%,40%{transform:rotate(-8deg)}50%{transform:rotate(10deg)}}
        .wave{animation:wave 2s ease-in-out .6s 1}
        @keyframes slide{to{transform:translateX(-50%)}}
        @keyframes bar{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
        .aurora{animation:aurora 14s ease-in-out infinite}
        .slide{animation:slide 32s linear infinite}
        .bar{transform-origin:center;animation:bar 1s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){.aurora,.slide,.bar,.wave{animation:none}}
      `}</style>
      <Palette open={pal} onClose={() => setPal(false)} />

      <main className="relative min-h-screen overflow-x-hidden bg-[#09090b] font-sans text-zinc-300 antialiased selection:bg-[#10b981]/30">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="aurora absolute -top-32 left-[10%] h-[380px] w-[520px] rounded-full bg-emerald-500/20 blur-[130px]" />
          <div className="aurora absolute -top-20 right-[5%] h-[320px] w-[420px] rounded-full bg-sky-500/15 blur-[130px] [animation-delay:-6s]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a20_1px,transparent_1px),linear-gradient(to_bottom,#27272a20_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,#000_60%,transparent_100%)]" />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-5 py-10 sm:gap-14 sm:px-8 sm:py-16">
          {/* Hero */}
          <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="pb-2 pt-6 sm:pt-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to Internships 2026–2027
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-emerald-400" aria-hidden="true" /> Kalyani, WB</span>
                <Clock_ />
                <button type="button" onClick={() => setPal(true)} className={`hidden items-center gap-1 rounded-md border border-zinc-700 px-2 py-1 text-zinc-300 hover:border-emerald-500/50 hover:text-emerald-400 sm:inline-flex ${focusRing}`}>
                  <Command className="h-3 w-3" aria-hidden="true" /> K
                </button>
              </div>
            </div>

            <p className="mt-10 font-mono text-sm text-zinc-400"><span className="wave inline-block origin-[70%_70%]" aria-hidden="true">👋</span> Hey, I&apos;m</p>
            <h1 className="mt-2 text-5xl font-semibold tracking-tighter text-white sm:text-7xl lg:text-8xl">Abhinav Deval</h1>
            <p className="mt-4 font-mono text-lg font-medium text-emerald-400 sm:text-2xl">Systems &amp; Cloud-Native Software Engineer</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              I am a B.Tech ECE student at IIIT Kalyani who likes making things fast: browser tools that never touch a server, real-time sync across devices, and production PRs in CNCF projects. Run the live demo below, then check the receipts.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {badges.map((b) => <li key={b} className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-[11px] text-zinc-300">{b}</li>)}
            </ul>
            <nav aria-label="Social links" className="mt-5 flex flex-wrap items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <Ext key={label} href={href} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"><Icon className="h-3.5 w-3.5" /> {label}</Ext>
              ))}
              <CopyEmail idle="Copy Email" done="Email Copied!" className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400" />
            </nav>
          </motion.header>

          <section aria-label="At a glance" className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 lg:grid-cols-4">
            {glance.map((g) => (
              <div key={g.k} className="bg-zinc-950 p-5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{g.k}</div>
                <div className="mt-1.5 text-sm font-medium text-zinc-100">{g.v}</div>
              </div>
            ))}
          </section>

          {/* Marquee */}
          <div aria-hidden="true" className="overflow-hidden border-y border-zinc-800/80 py-2 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
            <div className="slide flex w-max font-mono text-xs text-zinc-500">
              {[...marquee, ...marquee].map((m, i) => <span key={i} className="whitespace-nowrap pr-6">{m}<span className="ml-6 text-emerald-500/60">/</span></span>)}
            </div>
          </div>

          {/* Live demo */}
          <section id="demo" aria-label="Live demo" className="scroll-mt-4"><LiveDemo /></section>

          {/* Metrics */}
          <section id="metrics" aria-label="Key metrics" className="grid scroll-mt-4 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <Card key={m.l} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5 font-mono"><span className="text-3xl font-bold tracking-tight text-emerald-400">{m.v}</span>{m.u && <span className="text-xs text-zinc-500">{m.u}</span>}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">{m.l}</div>
                  {m.bar && (
                    <div className="mt-3">
                      <div className="flex h-1.5 overflow-hidden rounded-full bg-zinc-800" role="img" aria-label="144 easy, 165 medium, 46 hard">
                        <div style={{ width: "40.6%" }} className="bg-emerald-400" /><div style={{ width: "46.5%" }} className="bg-amber-400" /><div style={{ width: "12.9%" }} className="bg-rose-500" />
                      </div>
                      <div className="flex justify-between pt-1 font-mono text-[10px] font-medium"><span className="text-emerald-400">144 Easy</span><span className="text-amber-400">165 Med</span><span className="text-rose-400">46 Hard</span></div>
                    </div>
                  )}
                </div>
                <p className="mt-3 border-t border-zinc-800 pt-2.5 text-xs leading-relaxed text-zinc-400">{m.s}</p>
              </Card>
            ))}
          </section>

          {/* Projects */}
          <section id="projects" aria-label="Flagship systems projects" className="scroll-mt-4">
            <Title icon={Cpu}>Flagship Systems Projects</Title>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Card className="flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-bold text-white">EnclavePDF</h3><span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase text-emerald-400">Zero-Egress</span></div>
                <p className="mt-0.5 text-xs text-zinc-400">Zero-Egress In-Browser PDF Compression Engine</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{["React", "TypeScript", "Dedicated Web Workers", "pdf-lib", "pdfjs-dist", "Vite", "Tailwind CSS"].map((s) => <Tag key={s}>{s}</Tag>)}</div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">100% in-browser memory execution with zero network egress. Offloads CPU-intensive rasterization and downsampling pipelines to Dedicated Web Workers to prevent main-thread UI lag.</p>
                <p className="mt-2 text-xs italic leading-relaxed text-zinc-400">Lossless vector/metadata pruning for text documents vs. configurable DPI downsampling for scanned files.</p>
                <div className="mt-auto flex flex-wrap gap-2 border-t border-zinc-800 pt-3.5 [margin-top:1.25rem]">
                  <Ext href={LINKS.enclaveDemo} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400">Live Demo <ExternalLink className="h-3 w-3" aria-hidden="true" /></Ext>
                  <Ext href={LINKS.enclaveRepo} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-zinc-200 hover:border-emerald-500/50 hover:text-emerald-400">GitHub Source <ExternalLink className="h-3 w-3" aria-hidden="true" /></Ext>
                </div>
              </Card>
              <Card className="flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white">Vibrodo <Radio className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" /></h3>
                  <div className="flex h-6 items-center gap-0.5" aria-hidden="true">{[0, 0.2, 0.4, 0.1, 0.3].map((d, i) => <span key={i} className="bar h-5 w-1 rounded-full bg-emerald-400" style={{ animationDelay: `${d}s` }} />)}</div>
                </div>
                <p className="mt-0.5 text-xs text-zinc-400">Real-Time Synchronized Audio Platform</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{["React Native", "WebSockets", "Node.js", "State Machines"].map((s) => <Tag key={s}>{s}</Tag>)}</div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">Multi-device real-time audio playback synchronization using WebSockets with fault-tolerant background lifecycle reconciliation.</p>
                <div className="mt-auto flex flex-wrap gap-2 border-t border-zinc-800 pt-3.5 [margin-top:1.25rem]">
                  <Ext href={LINKS.vibrodoRepo} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-zinc-200 hover:border-emerald-500/50 hover:text-emerald-400">Architecture &amp; Client Repo <ExternalLink className="h-3 w-3" aria-hidden="true" /></Ext>
                </div>
              </Card>
            </div>
          </section>

          {/* Open source */}
          <section id="oss" aria-label="Open source" className="scroll-mt-4">
            <Title icon={Layers}>Open Source &amp; Backend Infrastructure</Title>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Card>
                <div className="flex items-center justify-between gap-2"><h3 className="flex items-center gap-2 text-sm font-bold text-white"><Server className="h-4 w-4 text-emerald-400" aria-hidden="true" /> CNCF / Meshery &amp; Layer5</h3><span className="shrink-0 rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] uppercase text-zinc-300">2 PRs · 1 Review</span></div>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-400">
                  <li><span className="font-semibold text-zinc-200">Component Engineering: </span>Authored accessible, theme-tokenized UI components (FormHelperText <PR href={LINKS.pr1659}>PR #1659</PR>, SubscriptionTable <PR href={LINKS.pr1660}>PR #1660</PR>) in <span className="font-mono text-zinc-300">layer5io/sistent</span> with strict TypeScript contracts.</li>
                  <li><span className="font-semibold text-zinc-200">Architectural Peer Reviews: </span>Reviewed <span className="font-mono text-zinc-300">meshery/meshery</span> (<PR href={LINKS.pr22149}>PR #22149</PR>), diagnosing Next.js <span className="font-mono text-zinc-300">router.query</span> decoding invariants, isolating bare &apos;%&apos; <span className="font-mono text-zinc-300">URIError: URI malformed</span> crash vectors, and validating 76+ E2E test suites.</li>
                </ul>
              </Card>
              <Card>
                <div className="flex items-center justify-between gap-2"><h3 className="flex items-center gap-2 text-sm font-bold text-white"><Flame className="h-4 w-4 text-emerald-400" aria-hidden="true" /> GSSoC &amp; Backend Core</h3><Ext href={LINKS.gssoc} className="shrink-0 font-mono text-xs text-emerald-400 hover:underline">Verify Rank #111 ↗</Ext></div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">Maintained a 13/13 weeks unbroken contribution streak across 9 repositories. Built backend infrastructure with Redis rate-limiting middleware, Celery async background worker queues, and secure JWT/OTP authentication workflows.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{["Redis Throttling", "Celery Workers", "JWT / OTP Auth", "Performance (CLS)", "CI/CD Submodules"].map((t) => <Tag key={t}>{t}</Tag>)}</div>
              </Card>
            </div>
          </section>

          {/* Arsenal + Roadmap */}
          <section aria-label="Technical arsenal">
            <Title icon={Terminal}>Technical Arsenal &amp; Algorithmic Focus</Title>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {arsenal.map((g) => (
                <Card key={g.t}><h3 className="border-b border-zinc-800 pb-2 text-xs font-bold uppercase tracking-wider text-zinc-200">{g.t}</h3><div className="mt-3 flex flex-wrap gap-1.5">{g.i.map((x) => <Tag key={x}>{x}</Tag>)}</div></Card>
              ))}
            </div>
          </section>
          <section aria-label="Roadmap">
            <Title icon={Compass}>Roadmap &amp; Vision</Title>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[{ t: "GSoC 2027", x: "Core contributions to CNCF cloud-native infrastructure, CLI tooling for mesheryctl, and distributed backend microservices." }, { t: "Class of 2029 Target", x: "High-frequency, low-latency, scalable backend infrastructure at top-tier product and fintech firms." }].map((m) => (
              <Card key={m.t}><div className="flex gap-3"><Flag className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" /><div><h3 className="font-mono text-xs font-bold uppercase tracking-wide text-emerald-400">{m.t}</h3><p className="mt-1 text-xs leading-relaxed text-zinc-400">{m.x}</p></div></div></Card>
            ))}
          </div>
          </section>

          {/* Contact terminal */}
          <footer id="contact" aria-label="Contact" className="scroll-mt-4 overflow-hidden rounded-2xl border border-emerald-500/30 bg-zinc-950 shadow-[0_0_50px_-15px_rgba(16,185,129,0.3)]">
            <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900/50 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono text-xs text-zinc-400">abhinav@iiit-kalyani: ~ (zsh)</span>
            </div>
            <div className="p-8 sm:p-10">
              <p className="font-mono text-xs text-emerald-400">$ cat intent.md</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">I am actively seeking high-impact Software Engineering and Systems internships for 2026–2027. My focus is on architecting low-latency backend infrastructure, client-side performance tooling, and distributed systems. Whether it&apos;s shipping core cloud-native features, solving complex algorithmic challenges, or optimizing memory-critical runtimes, I am ready to build.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={`mailto:${LINKS.email}`} className={`inline-flex max-w-full items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-zinc-950 shadow-md shadow-emerald-500/20 transition-colors hover:bg-emerald-400 ${focusRing}`}>
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /><span className="truncate">✉️ Get In Touch: {LINKS.email}</span>
                </a>
                <CopyEmail idle="Copy Email" done="Copied!" className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white" />
              </div>
              <p className="mt-8 text-sm text-zinc-400">Fellow student, mentor or recruiter? Say hi 👋 I would love to chat.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {socials.filter((s) => s.label !== "Codolio").map(({ label, href, icon: Icon }) => (
                  <Ext key={label} href={href} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"><Icon className="h-3 w-3" /> {label}</Ext>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </main>
    </MotionConfig>
  );
}
