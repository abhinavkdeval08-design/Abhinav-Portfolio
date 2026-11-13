import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(16,185,129,0.28), transparent 55%), radial-gradient(circle at 95% 10%, rgba(56,189,248,0.2), transparent 50%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#34d399" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#10b981" }} />
          Open to internships 2026–2027
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02 }}>Abhinav Deval</div>
          <div style={{ marginTop: 18, fontSize: 40, color: "#34d399" }}>Backend &amp; Cloud-Native Systems Engineer</div>
          <div style={{ marginTop: 22, fontSize: 28, color: "#a1a1aa" }}>
            Shipped in Meshery v1.0.77 (CNCF) · GSSoC &apos;26 #137 of 47,924 · IIIT Kalyani &apos;29
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#71717a" }}>
          <span>abhinavkdeval.vercel.app</span>
          <span>Go · TypeScript · Node.js · WebSockets</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
