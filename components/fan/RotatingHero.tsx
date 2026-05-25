"use client";

/**
 * Rotating hero background — crossfades between a stack of editorial photos
 * with a slow ken-burns zoom on the active image. CSS-only, no JS interval.
 *
 * Each image gets an offset-delayed keyframe so they cycle through cleanly:
 *   - 5 images × 7s visible each + 1s crossfade = 35s total loop
 *   - delays: 0s, 7s, 14s, 21s, 28s
 */
import type { CSSProperties } from "react";

export function RotatingHero({
  images,
  className = "",
}: {
  images: string[];
  className?: string;
}) {
  const total = images.length;
  const cycle = total * 7; // seconds per full loop

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {images.map((src, i) => {
        const delay = (i * cycle) / total;
        return (
          <div
            key={`${src}-${i}`}
            className="absolute inset-0"
            style={
              {
                animation: `rotating-hero-fade ${cycle}s ease-in-out ${delay}s infinite`,
                opacity: 0,
              } as CSSProperties
            }
          >
            <div
              className="absolute inset-0"
              style={
                {
                  backgroundImage: `url("${src}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  animation: `rotating-hero-kenburns ${cycle}s ease-in-out ${delay}s infinite`,
                  filter: "saturate(1.05) contrast(1.02)",
                } as CSSProperties
              }
            />
          </div>
        );
      })}

      {/* Strong gradient overlay so headline text reads at any moment */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,18,0.65) 0%, rgba(5,8,18,0.75) 45%, rgba(5,8,18,0.92) 100%), radial-gradient(ellipse at left center, rgba(5,8,18,0.55) 0%, rgba(5,8,18,0.2) 60%, transparent 100%)",
        }}
      />

      {/* Subtle frame at the bottom that fades into the rest of the page */}
      <div
        aria-hidden
        className="absolute -bottom-px left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #050b1f 95%, #050b1f 100%)",
        }}
      />
    </div>
  );
}
