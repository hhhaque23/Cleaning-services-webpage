import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pristine Cleaning Co. · Book a cleaner in 60 seconds";
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
            "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(60, 183, 99, 0.35), transparent 65%), radial-gradient(ellipse 80% 60% at 10% 80%, rgba(26, 161, 182, 0.35), transparent 65%)",
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
              width: 56,
              height: 56,
              background: "#F6FBFC",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0E1F2B"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
            </svg>
            <div
              style={{
                position: "absolute",
                bottom: -3,
                right: -3,
                width: 14,
                height: 14,
                background: "#3CB763",
                borderRadius: "50%",
                border: "3px solid #0E1F2B",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Pristine
            </span>
            <span style={{ fontSize: 22, fontWeight: 500, color: "rgba(246, 251, 252, 0.7)" }}>
              Cleaning Co.
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
              background: "rgba(60, 183, 99, 0.18)",
              color: "#9FDEB1",
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
                background: "#5DCB86",
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
            <span style={{ color: "#5DCB86" }}>60 seconds.</span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(246, 251, 252, 0.7)",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Rochester Hills · metro Detroit · transparent pricing · vetted cleaners · 24-hour
            re-clean guarantee.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
