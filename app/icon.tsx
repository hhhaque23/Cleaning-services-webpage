import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #264453 0%, #0E1F2B 100%)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            fill="#EEF4F8"
            d="M4 10 a8 8 0 0 1 16 0 v9 a2 2 0 0 1 -4 0 a2 2 0 0 1 -4 0 a2 2 0 0 1 -4 0 a2 2 0 0 1 -4 0 Z"
          />
          <circle cx="9.2" cy="10.7" r="1.2" fill="#0E1F2B" />
          <circle cx="14.8" cy="10.7" r="1.2" fill="#0E1F2B" />
        </svg>
        <div
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 8,
            height: 8,
            background: "#4CC6E6",
            borderRadius: "50%",
            border: "1.5px solid #0E1F2B",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
