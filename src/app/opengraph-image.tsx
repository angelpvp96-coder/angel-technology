import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Angel Technology — Sistemas de captación digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(ellipse at 50% 30%, #1e3a5f 0%, #0e0f12 70%)",
          color: "#F4F1EC",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(244,241,236,0.6)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#2D7D6E",
            }}
          />
          ANGEL TECHNOLOGY · FLORENCIA, CO
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            La presencia es
          </div>
          <div
            style={{
              fontSize: 124,
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#F4F1EC",
              marginTop: 4,
            }}
          >
            la conversión.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "rgba(244,241,236,0.55)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>Web · Google Business · WhatsApp · IA</span>
          <span style={{ color: "#E2632F" }}>angeltechnology.co</span>
        </div>
      </div>
    ),
    size,
  );
}
