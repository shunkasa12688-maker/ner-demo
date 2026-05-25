import type { DataTagKind } from "@/lib/types";

export function DataTag({
  kind,
  theme = "dark",
}: {
  kind: DataTagKind;
  theme?: "dark" | "light";
}) {
  const label = kind === "measured" ? "Measured" : "Modeled";
  const palette =
    theme === "dark"
      ? kind === "measured"
        ? "border-emerald-700/50 bg-emerald-500/10 text-emerald-300"
        : "border-amber-700/50 bg-amber-500/10 text-amber-300"
      : kind === "measured"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-amber-200 bg-amber-50 text-amber-700";
  return (
    <span
      className={`ml-1.5 inline-flex items-center rounded border ${palette} px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider`}
      title={
        kind === "measured"
          ? "Would come from the deployed site"
          : "Estimated / modeled — not a measurement"
      }
    >
      {label}
    </span>
  );
}
