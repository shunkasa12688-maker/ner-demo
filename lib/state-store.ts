import { promises as fs } from "fs";
import path from "path";
import { buildSampleData } from "./seed";
import { BUILTIN_CATALOG } from "./playbook";
import type {
  AppState,
  CatalogEntry,
  InterventionKind,
  SampleData,
  SegmentId,
} from "./types";
import { ALL_SEGMENT_IDS } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const SAMPLE_PATH = path.join(DATA_DIR, "sample.json");
const STATE_PATH = path.join(DATA_DIR, "state.json");
const CATALOG_PATH = path.join(DATA_DIR, "catalog.json");

function defaultBottlenecks() {
  const obj = {} as Record<SegmentId, "heat" | "growth" | "retention">;
  obj["ne-regulars"] = "retention";
  obj["wc-watchers"] = "retention";
  obj["boston-loyalists"] = "heat";
  obj["brazilian-lusophone"] = "growth";
  obj["central-american"] = "growth";
  return obj;
}

const DEFAULT_STATE: AppState = {
  selectedSegment: "brazilian-lusophone",
  timeWindow: "during-wc",
  perSegmentBottleneck: defaultBottlenecks(),
  manualOverride: null,
  rev: 0,
};

/**
 * In-memory singletons. These are the authoritative source on serverless
 * platforms (Vercel) where the filesystem is read-only. Locally we *also*
 * mirror to data/*.json so `npm run reset` and manual inspection still work.
 *
 * Within a single function instance these persist across invocations, which
 * is what makes the cockpit → fan closed loop work on Vercel: when both
 * tabs poll/post against the same warm instance (typical for a class demo
 * with two open tabs), they see the same state.
 */
let memState: AppState | null = null;
let memCatalog: CatalogEntry[] | null = null;
let memSample: SampleData | null = null;

async function trySafe<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

async function ensureDataDir() {
  await trySafe(() => fs.mkdir(DATA_DIR, { recursive: true }));
}

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

// ───── Sample data ─────

export async function getSample(): Promise<SampleData> {
  if (memSample) return memSample;
  await ensureDataDir();
  if (await exists(SAMPLE_PATH)) {
    const raw = await trySafe(() => fs.readFile(SAMPLE_PATH, "utf8"));
    if (raw) {
      try {
        memSample = JSON.parse(raw) as SampleData;
        return memSample;
      } catch {
        /* fall through to fresh seed */
      }
    }
  }
  memSample = buildSampleData();
  // Mirror to disk if we can (no-op on Vercel)
  await trySafe(() =>
    fs.writeFile(SAMPLE_PATH, JSON.stringify(memSample, null, 2), "utf8"),
  );
  return memSample;
}

// ───── App state ─────

function defensiveMerge(parsed: Partial<AppState>): AppState {
  const merged: AppState = {
    ...DEFAULT_STATE,
    ...parsed,
    perSegmentBottleneck: {
      ...DEFAULT_STATE.perSegmentBottleneck,
      ...(parsed.perSegmentBottleneck ?? {}),
    },
  } as AppState;
  if (!ALL_SEGMENT_IDS.includes(merged.selectedSegment)) {
    merged.selectedSegment = DEFAULT_STATE.selectedSegment;
  }
  return merged;
}

export async function getState(): Promise<AppState> {
  if (memState) return memState;
  await ensureDataDir();
  if (await exists(STATE_PATH)) {
    const raw = await trySafe(() => fs.readFile(STATE_PATH, "utf8"));
    if (raw) {
      try {
        memState = defensiveMerge(JSON.parse(raw) as Partial<AppState>);
        return memState;
      } catch {
        /* fall through to default */
      }
    }
  }
  memState = { ...DEFAULT_STATE };
  await trySafe(() =>
    fs.writeFile(STATE_PATH, JSON.stringify(memState, null, 2), "utf8"),
  );
  return memState;
}

export async function updateState(patch: Partial<AppState>): Promise<AppState> {
  const current = await getState();
  const clearsOverride =
    !("manualOverride" in patch) &&
    ("selectedSegment" in patch ||
      "timeWindow" in patch ||
      "perSegmentBottleneck" in patch);
  const next: AppState = {
    ...current,
    ...patch,
    perSegmentBottleneck: {
      ...current.perSegmentBottleneck,
      ...(patch.perSegmentBottleneck ?? {}),
    },
    manualOverride:
      "manualOverride" in patch
        ? (patch.manualOverride ?? null)
        : clearsOverride
          ? null
          : current.manualOverride,
    rev: current.rev + 1,
  };
  if (!ALL_SEGMENT_IDS.includes(next.selectedSegment)) {
    next.selectedSegment = current.selectedSegment;
  }
  memState = next;
  await trySafe(() =>
    fs.writeFile(STATE_PATH, JSON.stringify(next, null, 2), "utf8"),
  );
  return next;
}

export async function resetState() {
  memState = { ...DEFAULT_STATE };
  memCatalog = [...BUILTIN_CATALOG];
  await ensureDataDir();
  await trySafe(() =>
    fs.writeFile(STATE_PATH, JSON.stringify(memState, null, 2), "utf8"),
  );
  await trySafe(() =>
    fs.writeFile(CATALOG_PATH, JSON.stringify(memCatalog, null, 2), "utf8"),
  );
}

// ───── Catalog ─────

export async function getCatalog(): Promise<CatalogEntry[]> {
  if (memCatalog) return memCatalog;
  await ensureDataDir();
  if (await exists(CATALOG_PATH)) {
    const raw = await trySafe(() => fs.readFile(CATALOG_PATH, "utf8"));
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CatalogEntry[];
        const map = new Map(parsed.map((e) => [e.kind, e]));
        memCatalog = BUILTIN_CATALOG.map((b) => map.get(b.kind) ?? b);
        return memCatalog;
      } catch {
        /* fall through */
      }
    }
  }
  memCatalog = [...BUILTIN_CATALOG];
  await trySafe(() =>
    fs.writeFile(CATALOG_PATH, JSON.stringify(memCatalog, null, 2), "utf8"),
  );
  return memCatalog;
}

export async function updateCatalogEntry(
  kind: InterventionKind,
  patch: Partial<Omit<CatalogEntry, "kind">>,
): Promise<CatalogEntry> {
  const current = await getCatalog();
  const idx = current.findIndex((e) => e.kind === kind);
  if (idx < 0) {
    throw new Error(`Unknown intervention kind: ${kind}`);
  }
  const next = { ...current[idx], ...patch, kind };
  const updated = [...current];
  updated[idx] = next;
  memCatalog = updated;
  // Bump state rev so polling clients pick up the change on their next tick.
  const state = await getState();
  memState = { ...state, rev: state.rev + 1 };

  await trySafe(() =>
    fs.writeFile(CATALOG_PATH, JSON.stringify(updated, null, 2), "utf8"),
  );
  await trySafe(() =>
    fs.writeFile(STATE_PATH, JSON.stringify(memState, null, 2), "utf8"),
  );
  return next;
}
