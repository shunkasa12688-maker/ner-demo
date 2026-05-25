"use client";

import { Play } from "@phosphor-icons/react";
import { useState } from "react";

/**
 * Small image card — used for highlight thumbnails, player tiles, venue shots.
 * Falls back to a gradient + caption if the remote image fails.
 */
export function PhotoCard({
  src,
  alt,
  caption,
  topRight,
  showPlay = false,
  className = "",
  ratio = "aspect-video",
}: {
  src: string;
  alt: string;
  caption?: string;
  topRight?: string;
  showPlay?: boolean;
  className?: string;
  ratio?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-ner-navy to-ner-navy-deep shadow-lg ${ratio} ${className}`}
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {topRight && (
        <div className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
          {topRight}
        </div>
      )}
      {showPlay && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/95 p-3 shadow-lg transition group-hover:scale-110">
            <Play className="h-5 w-5 fill-ner-navy text-ner-navy" />
          </div>
        </div>
      )}
      {caption && (
        <div className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold text-white">
          {caption}
        </div>
      )}
    </div>
  );
}
