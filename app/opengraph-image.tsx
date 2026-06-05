import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Spectre Cleaning Solutions · Book a cleaner in 60 seconds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0E1F2B",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(76, 198, 230, 0.35), transparent 65%), radial-gradient(ellipse 80% 60% at 10% 80%, rgba(40, 110, 200, 0.32), transparent 65%)",
          color: "#F6FBFC",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "linear-gradient(135deg, #264453 0%, #0B1622 100%)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                fill="#EEF4F8"
                d="M4 10 a8 8 0 0 1 16 0 v9 a2 2 0 0 1 -4 0 a2 2 0 0 1 -4 0 a2 2 0 0 1 -4 0 a2 2 0 0 1 -4 0 Z"
              />
              <path fill="#0E1F2B" d="M7.2 9.4 C9 10 10.6 10.9 11.7 12.2 C10 11.9 8.3 11.2 7 10.4 Z" />
              <path fill="#0E1F2B" d="M16.8 9.4 C15 10 13.4 10.9 12.3 12.2 C14 11.9 15.7 11.2 17 10.4 Z" />
            </svg>
            <div
              style={{
                position: "absolute",
                bottom: -3,
                right: -3,
                width: 14,
                height: 14,
                background: "#4CC6E6",
                borderRadius: "50%",
                border: "3px solid #0E1F2B",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Spectre
            </span>
            <span style={{ fontSize: 22, fontWeight: 500, color: "rgba(246, 251, 252, 0.7)" }}>
              Cleaning Solutions
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              background: "rgba(76, 198, 230, 0.18)",
              color: "#A9E2F1",
              padding: "8px 16px",
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                background: "#4CC6E6",
                borderRadius: "50%",
              }}
            />
            Same-day available
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              maxWidth: 950,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Your home, spotless. Booked in&nbsp;</span>
            <span style={{ color: "#5BB8E6" }}>60 seconds.</span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(246, 251, 252, 0.7)",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Ann Arbor · Washtenaw County · transparent pricing · vetted cleaners · 24-hour
            re-clean guarantee.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
