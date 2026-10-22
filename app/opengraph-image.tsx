import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const alt = "Bhojon Bilash — Taste the Tradition";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0807",
          backgroundImage:
            "radial-gradient(circle at 50% 40%, #2A1812 0%, #0B0807 70%)",
          fontFamily: "serif",
          color: "#F6EFE6",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Border accent frame */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(242, 184, 75, 0.25)",
            borderRadius: "16px",
          }}
        />

        {/* Central emblem */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "999px",
            backgroundColor: "#15100E",
            border: "1px solid #F2B84B",
            fontSize: "40px",
            color: "#F2B84B",
            marginBottom: "24px",
          }}
        >
          ভ
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            letterSpacing: "4px",
            textAlign: "center",
            marginBottom: "12px",
            color: "#F6EFE6",
          }}
        >
          {siteConfig.name.toUpperCase()}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            color: "#F2B84B",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: "28px",
          }}
        >
          {siteConfig.tagline}
        </div>

        {/* Location & Specialty */}
        <div
          style={{
            fontSize: "18px",
            color: "#B8A99A",
            letterSpacing: "2px",
          }}
        >
          DHANMONDI · TRADITIONAL SMOKED KACCHI & TANDOOR GRILLS
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
