
# Build Prompt: AI Property Description Generator

Paste this as a single prompt into Lovable to scaffold the feature. Roadmap item: `34702d4b`.

---

## Goal

Let agents generate polished MLS-ready property descriptions from structured listing fields with one click, streamed into the property form, editable, with regenerate + tone controls. Save the final copy back to `properties.description`.

## Stack (already in project — do not change)

- React 18 + Vite + TS, Tailwind + shadcn/ui, TanStack Query, Zustand
- Feature-Sliced Design — new code lives in `src/features/ai-description/`
- Supabase (Lovable Cloud), edge functions in `supabase/functions/`
- Lovable AI Gateway via `@ai-sdk/openai-compatible` + `ai` (streamText)
- Logger: `src/shared/utils/logger`; config: `src/shared/constants/app-config.ts` (add new constants here — no magic numbers)
- Semantic HSL tokens only; primary brand `#E85D2E` already mapped

## Model

`google/gemini-2.5-flash` via Lovable AI Gateway. Server-only `LOVABLE_API_KEY` (already set). Stream response.

## Pages / surfaces

1. **Property form** (`src/widgets/properties/ui/PropertyForm.tsx` or equivalent): new "Generate with AI" section above the description textarea.
2. **Property detail / quick-edit drawer**: same component reused.
3. No new route.

## UX states

- `idle` — button "Generate description" + tone selector (Professional / Warm / Luxury / Concise) + length (Short ~60w / Standard ~120w / Long ~220w).
- `streaming` — textarea fills token-by-token, button becomes "Stop", shimmer on textarea border.
- `ready` — "Regenerate", "Accept", "Edit" actions; diff indicator if user edited after generation.
- `error` — inline alert with retry. Distinguish 429 (rate limit, retry hint) and 402 (out of credits, link to Workspace usage).
- `empty-input` — disabled button + tooltip listing required fields.

## Data model

No schema changes required. Optional additions (create migration only if user confirms):

- `properties.description_generated_at timestamptz null`
- `properties.description_source text null check (description_source in ('manual','ai','ai-edited'))`
- `ai_generations` (audit): `id, user_id, property_id, model, tone, length, prompt_tokens, completion_tokens, created_at` — RLS: agent reads own rows; insert via edge function with service role.

## Edge function

`supabase/functions/generate-property-description/index.ts`

- `verify_jwt = true` (default); resolve `auth.uid()` from JWT.
- Input (zod): `{ propertyId: string, tone: enum, length: enum }`.
- Fetch property row with RLS-respecting client; 404 if not visible.
- Build prompt from: address, beds/baths, sqft, year built, lot size, property_type, features[], neighborhood, price.
- `streamText({ model: gateway('google/gemini-2.5-flash'), system, prompt })` → `toUIMessageStreamResponse`.
- After stream end (use `onFinish`), insert into `ai_generations` and update `properties.description_generated_at`.
- CORS via `npm:@supabase/supabase-js@2/cors`.
- Map upstream 429/402 to same status codes back to client.

## Frontend module (FSD)

```
src/features/ai-description/
  api/generate.ts            // useChat-style hook bound to the edge function URL
  ui/GenerateDescriptionPanel.tsx
  ui/ToneSelect.tsx
  ui/LengthSelect.tsx
  model/types.ts             // Tone, Length, GenerationState
  model/use-generate-description.ts  // wraps AI SDK useChat, exposes start/stop/regenerate
  index.ts
```

Wire `GenerateDescriptionPanel` into the property form. On Accept, write to form field via existing react-hook-form context; mark `description_source = 'ai'` (or `'ai-edited'` if dirty after generation).

## Constants (add to `app-config.ts`)

```
AI_DESCRIPTION: {
  MODEL: 'google/gemini-2.5-flash',
  TONES: ['professional','warm','luxury','concise'],
  LENGTHS: { short: 60, standard: 120, long: 220 },
  MAX_REGENERATIONS_PER_HOUR: 20,
}
```

## Non-goals (do NOT build)

- Bulk generation across many properties
- Translation / multi-language
- Image-based description (vision)
- Saving multiple description variants per property
- Public sharing or marketing site embed
- Billing / usage UI (link out to Workspace usage only)
- Changes to existing property CRUD, RLS, or auth
- Touching `src/integrations/supabase/{client,types}.ts`

## Acceptance criteria

1. Agent opens a property with required fields, clicks Generate → text streams into the textarea within 2s of first token.
2. Stop cancels the stream; partial text remains and is editable.
3. Regenerate replaces text; manual edits flip source to `ai-edited`.
4. Saving the form persists description (and optional `description_source` / `description_generated_at` if migration applied).
5. Unauthenticated call returns 401; cross-tenant property returns 404.
6. 429 and 402 show distinct, actionable inline errors.
7. No new magic numbers, no direct color classes, no edits to generated Supabase files, no `verify_jwt = false`.
8. Logger used for start/finish/error events; no `console.*`.

## Verification checklist (post-build)

- Route: property form, viewport 1301×1211 + 390×844
- Console: no errors during stream
- Network: single POST to edge function, streamed chunks, final 200
- DB: `ai_generations` row inserted (if migration applied), `properties.description` updated on save
- Edge logs: clean, `auth.uid()` non-null, model id correct

---

After you approve this plan I'll implement it: edge function → FSD feature module → form integration → optional migration (with your sign-off) → verification pass.
