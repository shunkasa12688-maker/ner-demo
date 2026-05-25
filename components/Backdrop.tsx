"use client";

/**
 * Fixed-position background layer rendered inside each themed page. Sits
 * at z-index 0 so page content (with `relative z-10`) is always painted
 * above it. The previous attempt used `-z-10` which let body's solid
 * fallback paint over the aurora; that's gone now.
 *
 * Animation: blob keyframes live in app/globals.css (not styled-jsx) so
 * the names in `style={{ animation }}` actually resolve.
 */
export function Backdrop({ variant }: { variant: "fan" | "cockpit" }) {
  const noiseSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.07 0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(%23n)'/>
    </svg>`.replace(/\s+/g, " "),
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "fan"
              ? "linear-gradient(180deg, #060b1f 0%, #02060f 60%, #050310 100%)"
              : "linear-gradient(180deg, #0a1024 0%, #050817 100%)",
        }}
      />

      {/* Animated blobs */}
      <div className="absolute inset-0">
        <div
          className="absolute rounded-full opacity-90 blur-[110px]"
          style={{
            top: variant === "fan" ? "-10%" : "-5%",
            left: variant === "fan" ? "55%" : "5%",
            width: "70vw",
            height: "60vh",
            background:
              "radial-gradient(closest-side, rgba(26,42,94,0.95), transparent)",
            animation: "blob-a 26s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full opacity-85 blur-[130px]"
          style={{
            top: variant === "fan" ? "25%" : "10%",
            left: variant === "fan" ? "-15%" : "auto",
            right: variant === "fan" ? "auto" : "-10%",
            width: "65vw",
            height: "55vh",
            background:
              variant === "fan"
                ? "radial-gradient(closest-side, rgba(221,31,45,0.5), transparent)"
                : "radial-gradient(closest-side, rgba(221,31,45,0.3), transparent)",
            animation: "blob-b 32s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full opacity-75 blur-[120px]"
          style={{
            bottom: "-10%",
            left: "40%",
            width: "55vw",
            height: "50vh",
            background:
              "radial-gradient(closest-side, rgba(106,161,255,0.4), transparent)",
            animation: "blob-c 28s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Subtle pitch-stripe pattern (only on fan side, very faint) */}
      {variant === "fan" && (
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 80px, rgba(255,255,255,0.6) 80px 82px)",
          }}
        />
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-60"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${noiseSvg}")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
