"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  AppState,
  CatalogEntry,
  InterventionKind,
  SampleData,
} from "./types";

interface UseAppStateOpts {
  pollMs?: number;
}

export function useAppState({ pollMs = 1000 }: UseAppStateOpts = {}) {
  const [state, setState] = useState<AppState | null>(null);
  const [sample, setSample] = useState<SampleData | null>(null);
  const [catalog, setCatalog] = useState<CatalogEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const lastRevRef = useRef<number>(-1);

  useEffect(() => {
    let cancelled = false;

    async function fetchInitial() {
      try {
        const [s, d, c] = await Promise.all([
          fetch("/api/state", { cache: "no-store" }).then((r) => r.json()),
          fetch("/api/data", { cache: "no-store" }).then((r) => r.json()),
          fetch("/api/catalog", { cache: "no-store" }).then((r) => r.json()),
        ]);
        if (cancelled) return;
        setState(s);
        setSample(d);
        setCatalog(c);
        lastRevRef.current = s.rev;
      } catch (e: unknown) {
        if (!cancelled) setError((e as Error).message);
      }
    }

    fetchInitial();

    if (pollMs <= 0) return () => { cancelled = true; };

    const interval = setInterval(async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const sRes = await fetch("/api/state", { cache: "no-store" });
        const next: AppState = await sRes.json();
        if (cancelled) return;
        if (next.rev !== lastRevRef.current) {
          lastRevRef.current = next.rev;
          setState(next);
          // Catalog only changes when state.rev does, so co-fetch on rev bump.
          const cRes = await fetch("/api/catalog", { cache: "no-store" });
          const nextCatalog: CatalogEntry[] = await cRes.json();
          if (!cancelled) setCatalog(nextCatalog);
        }
      } catch {
        /* swallow transient polling errors */
      }
    }, pollMs);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [pollMs]);

  const patch = useCallback(async (delta: Partial<AppState>) => {
    setState((cur) => (cur ? { ...cur, ...delta } as AppState : cur));
    try {
      const res = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(delta),
      });
      const next: AppState = await res.json();
      lastRevRef.current = next.rev;
      setState(next);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  }, []);

  const editCatalogEntry = useCallback(
    async (
      kind: InterventionKind,
      delta: Partial<Omit<CatalogEntry, "kind">>,
    ) => {
      try {
        const res = await fetch("/api/catalog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind, ...delta }),
        });
        const updated: CatalogEntry = await res.json();
        // Refresh full catalog so any other consumer is consistent
        const all = await fetch("/api/catalog", { cache: "no-store" }).then((r) => r.json());
        setCatalog(all);
        return updated;
      } catch (e: unknown) {
        setError((e as Error).message);
        return null;
      }
    },
    [],
  );

  const setManualOverride = useCallback(
    (kind: InterventionKind | null) => {
      void patch({ manualOverride: kind });
    },
    [patch],
  );

  return {
    state,
    sample,
    catalog,
    patch,
    editCatalogEntry,
    setManualOverride,
    error,
  };
}
