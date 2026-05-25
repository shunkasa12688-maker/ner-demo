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

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function getSample(): Promise<SampleData> {
  await ensureDataDir();
  if (!(await exists(SAMPLE_PATH))) {
    const fresh = buildSampleData();
    await fs.writeFile(SAMPLE_PATH, JSON.stringify(fresh, null, 2), "utf8");
    return fresh;
  }
  const raw = await fs.readFile(SAMPLE_PATH, "utf8");
  return JSON.parse(raw) as SampleData;
}

export async function getState(): Promise<AppState> {
  await ensureDataDir();
  if (!(await exists(STATE_PATH))) {
    await fs.writeFile(STATE_PATH, JSON.stringify(DEFAULT_STATE, null, 2), "utf8");
    return { ...DEFAULT_STATE };
  }
  const raw = await fs.readFile(STATE_PATH, "utf8");
  const parsed = JSON.parse(raw) as Partial<AppState>;
  return {
    ...DEFAULT_STATE,
    ...parsed,
    perSegmentBottleneck: {
      ...DEFAULT_STATE.perSegmentBottleneck,
      ...(parsed.perSegmentBottleneck ?? {}),
    },
  } as AppState;
}

export async function updateState(patch: Partial<AppState>): Promise<AppState> {
  const current = await getState();
  // Any diagnosis change (segment / window / bottleneck) clears the manual override
  // unless the patch is explicitly setting one — that way the rule narrative resumes.
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
  await fs.writeFile(STATE_PATH, JSON.stringify(next, null, 2), "utf8");
  return next;
}

export async function resetState() {
  await ensureDataDir();
  await fs.writeFile(STATE_PATH, JSON.stringify(DEFAULT_STATE, null, 2), "utf8");
  await fs.writeFile(
    CATALOG_PATH,
    JSON.stringify(BUILTIN_CATALOG, null, 2),
    "utf8",
  );
}

export async function getCatalog(): Promise<CatalogEntry[]> {
  await ensureDataDir();
  if (!(await exists(CATALOG_PATH))) {
    await fs.writeFile(
      CATALOG_PATH,
      JSON.stringify(BUILTIN_CATALOG, null, 2),
      "utf8",
    );
    return [...BUILTIN_CATALOG];
  }
  const raw = await fs.readFile(CATALOG_PATH, "utf8");
  const parsed = JSON.parse(raw) as CatalogEntry[];
  // Defensive merge — if the on-disk catalog is missing a kind, fill from builtin.
  const map = new Map(parsed.map((e) => [e.kind, e]));
  return BUILTIN_CATALOG.map((b) => map.get(b.kind) ?? b);
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
  current[idx] = next;
  await fs.writeFile(CATALOG_PATH, JSON.stringify(current, null, 2), "utf8");
  // Bump state rev so polling clients pick up the change on their next tick.
  const state = await getState();
  await fs.writeFile(
    STATE_PATH,
    JSON.stringify({ ...state, rev: state.rev + 1 }, null, 2),
    "utf8",
  );
  return next;
}
