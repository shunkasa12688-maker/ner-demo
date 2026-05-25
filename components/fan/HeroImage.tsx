"use client";

import { useState } from "react";

/**
 * Hero image with three layers of fallback:
 *   1. Local PNG (if the user has generated it)
 *   2. Unsplash photo (works out of the box)
 *   3. Branded SVG placeholder (last resort — never an empty box)
 */
export function HeroImage({
  src,
  unsplash,
  alt,
  badge,
  title,
  subtitle,
  className = "",
}: {
  src: string;
  unsplash: string;
  alt: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const [localFailed, setLocalFailed] = useState(false);
  const [remoteFailed, setRemoteFailed] = useState(false);

  const showLocal = !localFailed;
  const showRemote = localFailed && !remoteFailed;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ner-navy via-ner-navy-deep to-ner-red/30 ${className}`}
    >
      {showLocal && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setLocalFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {showRemote && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={unsplash}
          alt={alt}
          onError={() => setRemoteFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Tint so headline text always reads */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

      {/* Overlay content */}
      <div className="relative flex h-full flex-col justify-end p-6 text-white sm:p-8">
        {badge && (
          <div className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-ner-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
            {badge}
          </div>
        )}
        {title && (
          <div className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            {title}
          </div>
        )}
        {subtitle && (
          <div className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
