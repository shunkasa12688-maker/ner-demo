#!/usr/bin/env node
/**
 * Clears data/state.json and data/sample.json so the next dev request
 * regenerates them from the deterministic seed in lib/seed.ts.
 */
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "data");
for (const name of ["state.json", "sample.json", "catalog.json"]) {
  const p = join(DATA_DIR, name);
  if (existsSync(p)) {
    rmSync(p);
    console.log(`removed ${name}`);
  }
}
console.log("Done. The next request to /api/state, /api/data, or /api/catalog will regenerate them.");
