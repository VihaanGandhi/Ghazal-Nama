import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0a0908",
          color: "#e8a24c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          fontFamily: "Georgia",
          letterSpacing: "0.02em",
        }}
      >
        GN
      </div>
    ),
    size
  );
}
