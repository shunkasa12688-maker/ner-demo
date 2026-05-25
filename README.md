# NER Capitalization Demo

Class-presentation prototype for a New England Revolution consulting project.
Two pages, one closed loop:

- **`/cockpit`** — back-end "strategy cockpit" (BI dashboard look). You set
  the diagnosis here.
- **`/fan`** — front-end fan site (sporty look). The intervention shown
  here is decided by the cockpit's current diagnosis.

The hero of the demo isn't the catalog — it's the **reasoning chain**.
Every recommendation is shown alongside the signals that drove it, the
rule that fired, and a plain-language "why."

> Illustrative prototype — sample data. Numbers are tagged **Measured**
> (would come from the live site) or **Modeled** (estimated).

## Run it

```
npm install --legacy-peer-deps
npm run dev
```

Then open two tabs side-by-side:

- http://localhost:3000/cockpit
- http://localhost:3000/fan

Flip the bottleneck radio in the cockpit. The fan page swaps within ~1 second.

## Reset demo state

`data/state.json` and `data/sample.json` are regenerated from a deterministic
seed on first request. To start clean before a presentation:

```
npm run reset
```

## Refreshing the fan-page imagery

`components/fan/images.ts` holds the URLs the fan-side tiles use. These point
at the official New England Revolution CDN (`images.mlssoccer.com`) — hot-linked
for educational reference only, with attribution in the fan-page footer.

To pull fresh URLs from the live NER site:

```
# Option A — Firecrawl (recommended, handles JS-rendered pages)
# 1. Sign up at https://firecrawl.dev and grab an API key (looks like fc-...)
# 2. Set the env var, then run:
FIRECRAWL_API_KEY=fc-your-key-here npm run fetch:images

# Option B — curl fallback (no API key, static markup only)
npm run fetch:images
```

The script writes `components/fan/images.ts.next` so you can diff before
promoting. Review and `mv` over `images.ts` when you're happy.

> The Firecrawl path is way better for JS-heavy pages — NER's `/players`
> and `/news` only render their photos client-side, which `curl` can't see.

## Demo script (3 minutes)

1. **Open both tabs side by side.** Cockpit on the left, fan page on the right.
2. **The opening shot.** Segment defaults to **Brazilian / Lusophone**,
   time window **During WC**. The reasoning trace reads: *Heat high · Growth
   low · Local cluster ✓ → Conversion bottleneck → Rule: Growth + local cluster
   → Local Fan-Session Event Invite. "They talk online but don't show up,
   and we know where they live."* The fan page shows a Portuguese watch-party
   invite in Everett / Somerville.
3. **First flip.** Change the bottleneck for that segment from **Growth → Retention**.
   Within a second the fan page swaps to the World Cup hub; the reasoning
   trace re-writes itself; the catalog highlight slides to a different card.
4. **Second flip.** Change the segment to **NE Soccer Regulars**. The
   bottleneck reads Heat → the fan page swaps to the prediction quiz.
   *Different reasoning, different action.*
5. **Third flip.** Keep Retention selected, change the time window from
   **During → After WC**. The fan page swaps from WC hub to the post-spike
   re-engagement nudge — *same lever, different time-window branch*.
6. **Land the point.** Show the **Routing rules** panel and the
   **Intervention catalog (5 of N)** with its "+ Add new" tile. The
   takeaway: *the system is the pipeline, not the catalog. Add a rule,
   add a card.*

## Architecture (one-pager)

```
cockpit control change
  → POST /api/state            (writes data/state.json)
fan page polls every 1s
  → GET /api/state             (reads data/state.json)
  → lib/playbook.ts maps {bottleneck, localCluster, timeWindow}
                     to one of 5 intervention components
  → fan page re-renders
```

- **State source of truth:** `data/state.json` (a small JSON file).
- **Seed data:** `data/sample.json` (matches, events, people, interventions,
  benchmarks). Generated deterministically by `lib/seed.ts`.
- **Routing logic:** five rules in `lib/playbook.ts`, rendered to the
  audience in the cockpit's *Routing rules* panel — not hidden.

## File layout

```
ner-demo/
├── app/
│   ├── page.tsx                 # landing
│   ├── cockpit/page.tsx
│   ├── fan/page.tsx
│   └── api/
│       ├── state/route.ts       # GET, POST
│       ├── data/route.ts        # GET seed
│       └── reset/route.ts       # POST (optional)
├── components/
│   ├── PrototypeBadge.tsx
│   ├── DataTag.tsx
│   ├── cockpit/                 # KPI strip, lever panels, CLV, diagnosis,
│   │                            # reasoning trace, catalog, routing rules
│   └── fan/                     # 5 interventions + router
├── lib/
│   ├── types.ts
│   ├── seed.ts                  # deterministic sample data
│   ├── playbook.ts              # routing rules + intervention metadata
│   ├── state-store.ts           # file-backed state I/O
│   └── use-app-state.ts         # polling hook for both pages
├── public/
│   └── images/                  # 6 hero PNGs — see "Hero images" below
├── data/                        # regenerated by `npm run reset`
└── scripts/reset.mjs
```

## Hero images

The fan-page interventions look much better with real hero images. Generate
6 PNGs externally (Nano Banana Pro / Gemini app / any image gen) using the
shared style brief and per-image prompts in
`../.claude/plans/project-brief-ner-fizzy-kazoo.md`, then drop them into
`public/images/`:

```
public/images/
  hero-landing.png
  hero-quiz.png
  hero-reaction.png
  hero-event.png
  hero-wc.png
  hero-postwc.png
```

If any image is missing the component falls back to a Tailwind gradient
placeholder — no broken-image icons during the presentation.

## Add a new intervention

This is the openness story. Three steps:

1. Add a new component in `components/fan/MyNewIntervention.tsx`.
2. Add a `kind` and metadata entry in `lib/playbook.ts`.
3. Add one rule to `selectIntervention()` and to `ROUTING_RULES`.

The catalog and the routing-rules panel update automatically.

## What this demo is NOT

- Not a real analytics backend. State is a single JSON file.
- Not a trained model. The CLV readout is a transparent calculator,
  not a prediction.
- Not professional translation. PT/ES copy is short illustrative phrasing.
- Not the consulting analysis itself (revenue gap, sponsorship, stadium) —
  that's a separate deliverable.
