import { Sparkle } from "@phosphor-icons/react";

export function PrototypeBadge({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const styles =
    theme === "dark"
      ? "border-bi-border bg-bi-surface text-bi-text-dim"
      : "border-slate-200 bg-white/80 text-slate-600 backdrop-blur";
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border ${styles} px-3 py-1 text-xs font-medium tracking-wide uppercase`}
    >
      <Sparkle weight="light" className="h-3.5 w-3.5" />
      Illustrative prototype — sample data
    </div>
  );
}
