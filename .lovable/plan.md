# CozyMLS — 3-Month Technical Roadmap

Based on the current PRD (React 18 + Vite + Tailwind + shadcn, Lovable Cloud/Supabase backend, FSD architecture, modules: Dashboard, Properties, Contacts, Deals, Activities, Reports, Settings).

Prioritization uses **RICE-lite**: P0 = blocker/foundational, P1 = high user value, P2 = nice-to-have / polish.

---

## Month 1 — Stabilize & Harden (Foundation)

Goal: lock down quality, security, and core UX gaps before stacking new features.

### Week 1 — Quality baseline
- **[P0] Fix LaserFlow responsive + color regression** (carry-over)
  - Verify on real iOS/Android/tablet via responsive QA
  - Add visual regression snapshot if feasible
- **[P0] Test coverage audit**
  - Identify untested critical paths (auth, deals pipeline, RLS-protected mutations)
  - Target: 60% coverage on `features/` and `integrations/supabase/hooks/`
- **[P0] Error boundary + logging review**
  - Confirm `ErrorBoundary` wraps every page route
  - Wire `logger` to a remote sink (e.g., Supabase `logs` table or edge function)

### Week 2 — Security & RLS hardening
- **[P0] RLS policy audit**
  - Verify every table denies anonymous by default
  - Add automated `supabase--linter` check to CI
- **[P0] Role-based UI gating**
  - Hook `has_role()` into sidebar/route guards (admin/manager/agent)
  - Hide destructive actions for non-admins
- **[P1] Audit log table**
  - Track create/update/delete on properties, deals, contacts
  - Admin-only viewer page

### Week 3 — Mobile UX polish
- **[P1] Mobile dashboard parity**
  - StatsCards stack correctly, LaserFlow gracefully degrades
  - Pull-to-refresh on dashboard + lists
- **[P1] Mobile navigation overhaul**
  - Verify `MobileTabBar` reflects role permissions
  - Safe-area handling on notched devices
- **[P2] Offline-friendly read cache**
  - React Query persist to localStorage for last-viewed lists

### Week 4 — Performance pass
- **[P1] Bundle analysis + code splitting**
  - Lazy-load Reports (Recharts), Three.js LaserFlow, ReportBuilder
  - Target: initial JS < 250KB gzipped
- **[P1] Image optimization for properties**
  - Add Supabase storage transforms, lazy-load, blur placeholders
- **[P2] Lighthouse 90+ on dashboard + properties list**

---

## Month 2 — Core Feature Expansion

Goal: deliver the highest-value missing CRM capabilities.

### Week 5–6 — Real-time collaboration
- **[P0] Realtime deal pipeline**
  - Subscribe to `deals` table changes; live-update Kanban
- **[P1] Realtime activity feed**
  - Notifications dropdown shows new assignments live
- **[P1] Presence indicators** on shared properties/deals

### Week 7 — MLS data import
- **[P0] CSV import for properties**
  - Edge function: parse, validate, batch insert with progress
  - Field mapping UI + dry-run preview
- **[P1] MLS feed ingestion (RETS/RESO scaffold)**
  - Edge function placeholder + scheduled cron via `pg_cron`
  - Configurable per-agent feed credentials (secrets)

### Week 8 — Communications
- **[P1] Email integration**
  - Send-from-app via Resend (transactional email skill)
  - Templates for new-lead, showing reminder, deal-stage change
- **[P1] Contact timeline**
  - Unified view: activities + emails + deal changes per contact
- **[P2] SMS reminders** (Twilio connector) — backlog

---

## Month 3 — Intelligence & Growth

Goal: differentiate with AI and analytics; prepare for scale.

### Week 9 — AI assistance (Lovable AI Gateway)
- **[P1] AI property description generator**
  - `google/gemini-2.5-flash` from property attributes
- **[P1] AI lead-scoring**
  - Score contacts 0–100 from activity + deal history
  - Surface on contacts list and dashboard
- **[P2] Natural-language report query**
  - "Show me deals closing this month" → builds report config

### Week 10 — Advanced reports
- **[P1] Scheduled reports**
  - Cron-trigger edge function → email PDF/CSV
- **[P1] Report sharing**
  - Public read-only links with expiry tokens
- **[P2] Custom dashboard widgets** from saved reports

### Week 11 — Document management
- **[P1] Contract/document storage per deal**
  - Supabase Storage bucket with signed URLs
  - Drag-drop upload, version history
- **[P2] E-signature stub** (DocuSign/Dropbox Sign connector) — backlog

### Week 12 — Launch prep
- **[P0] End-to-end QA pass** across all modules
- **[P0] Production observability**
  - Edge function logs dashboard, error rate alerts
- **[P1] Onboarding flow**
  - First-run wizard: profile → import contacts → create first property
- **[P1] Documentation refresh**
  - User guide, admin guide, API reference for edge functions

---

## Technical Cross-Cuts (continuous)

| Area | Standing investment |
|---|---|
| **Design system** | Migrate any remaining direct-color usage to semantic HSL tokens |
| **Accessibility** | WCAG AA audit each shipped feature; keyboard nav, ARIA, contrast |
| **CI/CD** | Add `supabase--linter`, vitest coverage gate, Lighthouse CI |
| **Tech debt** | Replace remaining mock-data fallbacks with real Supabase queries |
| **Type safety** | Eliminate `unknown`/`any` in `report` and `dashboard` entities |

---

## Milestones & Success Criteria

- **End of Month 1**: 0 P0 security findings, mobile parity, <250KB initial bundle, 60% test coverage on critical paths.
- **End of Month 2**: Realtime pipeline live, CSV import shipping ≥1k rows reliably, email notifications in production.
- **End of Month 3**: AI features behind feature flag for beta users, scheduled reports operational, onboarding flow live, ready for paid launch.

---

## Out of Scope (parked)

- Native mobile apps (Capacitor) — re-evaluate Q2
- Multi-tenant white-label — re-evaluate after paid users >50
- Mapbox property maps — backlog, blocked on design direction
- Public marketing site — separate project

---

## Next Step

On approval, I will create roadmap items for **Month 1, Week 1** tasks (LaserFlow fix verification, test coverage audit, error/logging review) and begin executing the first `in_progress` item.
