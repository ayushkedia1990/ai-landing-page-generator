# AI Landing Page Generator MVP - Tasks

## Goal

Ship a working MVP in **1 week**.

## Update Protocol

- Whenever `prompt.md` or `TASKS.md` are in prompt context, update both files during that run.
- Each update must include completed work, the current slice, the next planned slice, and any task checkbox changes.

## Current Status

Last updated: 2026-06-13

Completed so far:
- App scaffold, auth, Prisma setup, dashboard shell
- Project creation and persistence
- Guided intake form with saved `input_data`
- Hardcoded style presets
- Fixed landing page schema and validation
- OpenAI generation flow saving `generated_page`
- In-app landing page preview
- Simple generated content editor for hero, social proof labels, feature items, FAQ items, and final CTA text
- Local development database wiring fixed with a real root `DATABASE_URL`
- Local Docker Postgres is running on port `5433` and Prisma connectivity is verified
- OpenRouter-compatible provider config added for free-model testing
- LLM config now strips accidental quote characters from pasted env values and surfaces clearer OpenRouter auth errors
- OpenRouter now falls back to the documented free model slug when `OPENAI_MODEL` is left blank
- OpenRouter now uses the live `openrouter/free` router by default so blank model config does not point at a stale free-model slug
- Vercel deployments now boot in public preview mode when Clerk env vars are missing instead of crashing in middleware
- Deployment setup guidance is now documented for Clerk, hosted Postgres, and OpenRouter environment variables on Vercel
- Dashboard and project routes now have route-level loading, not-found, and error UI instead of generic framework fallbacks
- Next 16 routing now uses `proxy.ts` instead of the deprecated `middleware.ts` convention
- Intake, generation, and edit actions now use clearer success/error feedback with provider-accurate copy in the project workspace
- Empty-state coverage is now confirmed across dashboard, preview, and project-not-found surfaces
- Local diagnosis confirmed that missing Clerk keys in `.env` force the app into preview mode; auth setup copy now explains local versus deployed configuration more clearly
- Local development now falls back to a demo user when Clerk keys are missing so project creation and preview work again without reconfiguring auth first
- Local dashboard runtime error was traced to a stopped Postgres container; Docker Desktop was relaunched, the `ai-landing-page-generator-postgres` container was restarted, and `/dashboard` now renders again
- Figma-aligned project workspace UI: PageCraft split layout with left intake sidebar, preview toolbar (device toggles, Generate/Regenerate/Actions/Export), searchable dropdowns, character counters, conversion-logic chips, and updated style preset labels

Current planned next slice:
- Validate the Figma-style intake and preview flow in the browser
- Continue publish and generated page edit polish after UI validation

Current blocker/status notes:
- No active blocker from Prisma setup. Local Postgres is being provided through Docker on port `5433` because no Windows PostgreSQL service was present and port `5432` was already in use.
- For OpenRouter testing, put the key in the root `.env` file under `OPENROUTER_API_KEY` and set `OPENAI_MODEL` to the free model slug you want to use.
- Current generation issue: a malformed pasted OpenRouter key should now fail with a clearer auth message instead of the opaque `User not found` provider error.
- Current generation issue update: if `OPENAI_MODEL` is left blank with OpenRouter enabled, generation now routes through `openrouter/free`; if a manually pinned slug has no endpoints, the app now returns a targeted fix message.
- Vercel deployment note: set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to enable auth, and replace the local `DATABASE_URL` with a hosted Postgres connection string if you want dashboard/project flows to work in production.
- Current support slice: clarify where each production secret comes from and which values are required versus optional for a working Vercel MVP.
- Current polish update: dashboard and project route loading/ownership/failure states now surface explicit UI for real users instead of generic loading or error pages.
- Deploy-readiness update: the auth request boundary now uses the current Next 16 `proxy.ts` convention, removing the middleware deprecation warning from production builds.
- Current feedback update: the intake, generation, and generated-page edit actions now surface stronger success and failure states instead of low-emphasis status text.
- Empty-state audit update: dashboard already covers the zero-project case, the project page already covers the no-generated-preview case, and the new project `not-found` route covers missing or unauthorized records.
- Local runtime diagnosis: the root `.env` currently has `DATABASE_URL`, `OPENROUTER_API_KEY`, and `OPENAI_MODEL`, but it is missing `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`, so local auth routes intentionally fall back to preview mode.
- Local auth override update: in development only, missing Clerk keys now map to a shared demo user ID so the dashboard, project creation, and project detail flows remain usable; production still requires real Clerk keys.
- Local recovery update: the dashboard error screen was caused by Prisma failing to reach `localhost:5433`; the root issue was that Docker Desktop was not running and the `ai-landing-page-generator-postgres` container was stopped. Both have now been restored and the live dashboard route returns `200` again.

The MVP should allow a user to:
1. sign in
2. create a project
3. fill a guided form
4. select a style preset
5. generate a landing page using an LLM
6. preview and make simple text edits
7. publish the page to a public URL

## Product Scope

### Build now
- Auth
- Project creation
- Guided form input
- 3 hardcoded style presets
- LLM-based landing page generation
- Save generated page JSON in DB
- Preview generated landing page
- Simple text editing
- Publish flow
- Public page route by slug

### Do not build now
- Billing
- Teams/workspaces
- Custom domains
- Analytics dashboard
- Lead capture backend
- Image generation
- Complex design systems
- Drag-and-drop editing
- AI section regeneration
- Multi-page site generation
- Multiple model providers
- Background workers/queues unless absolutely required
- Advanced versioning

---

## Suggested Stack

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- PostgreSQL
- Prisma or Drizzle
- Auth provider: fastest option available
- OpenAI API
- Vercel-ready deployment

---

## Core Architecture Rules

- Keep everything in **one app**
- Keep schemas **fixed**
- Keep configs **hardcoded in code**
- Use a **single `projects` table** initially if possible
- Use JSON/JSONB for:
  - `input_data`
  - `generated_page`
- Render pages from structured JSON, not generated HTML
- Prefer synchronous generation for MVP

---

## Fixed Style Presets

Implement exactly 3 presets in code:

1. `modern-saas`
2. `minimal-clean`
3. `bold-startup`

Each preset should include:
- `label`
- `promptHint`
- theme defaults:
  - `primaryColor`
  - `backgroundColor`
  - `textColor`

---

## Fixed Landing Page Schema

Use a fixed structured schema for generated landing pages.

### Theme
- preset
- primaryColor
- backgroundColor
- textColor

### Page
- title
- description
- hero
  - headline
  - subheadline
  - primaryCtaText
  - secondaryCtaText
- socialProof
  - headline
  - logos[]
- features
  - headline
  - items[]
    - title
    - description
- howItWorks
  - headline
  - steps[]
    - title
    - description
- faq
  - headline
  - items[]
    - question
    - answer
- cta
  - headline
  - buttonText

Keep rendering tied to this exact schema for MVP.

---

## Database / Model Requirements

Minimum table: `projects`

Suggested fields:
- id
- user_id
- name
- status
- style_preset
- input_data
- generated_page
- published
- published_slug
- created_at
- updated_at

Use the auth provider’s user model if available instead of overbuilding local auth tables.

---

## MVP User Flow

1. User signs in
2. User creates a project
3. User fills guided form
4. User selects style preset
5. User clicks generate
6. App calls LLM with:
   - form data
   - style preset guidance
   - fixed schema instructions
7. App validates generated JSON
8. App saves `generated_page`
9. User previews page
10. User edits text fields
11. User clicks publish
12. Public page becomes available at `/p/[slug]`

---

## Milestones

## Milestone 1 - App foundation
- [x] Inspect repo and identify current stack/state
- [x] If repo is empty, scaffold the app
- [x] Set up Next.js + TypeScript + Tailwind
- [x] Set up auth
- [x] Set up DB connection
- [x] Define initial project model/schema
- [x] Create base app shell / dashboard layout

### Deliverable
A user can sign in and reach a dashboard.

---

## Milestone 2 - Project creation
- [x] Create project list page
- [x] Create new project flow
- [x] Persist project in DB
- [x] Add project detail page route

### Deliverable
A signed-in user can create and open a project.

---

## Milestone 3 - Guided form input
- [x] Build guided intake form
- [ ] Include fields:
  - [x] project name
  - [x] product name
  - [x] one-line description
  - [x] target audience
  - [x] primary CTA
  - [x] tone
  - [x] style preset
  - [x] optional features list
  - [x] optional testimonials
  - [x] optional FAQs
- [x] Save form data to `input_data`
- [x] Load saved form data for editing

### Deliverable
A user can fill and save the landing page input form.

---

## Milestone 4 - Style preset config
- [x] Create hardcoded style preset config file
- [ ] Add 3 presets:
  - [x] modern-saas
  - [x] minimal-clean
  - [x] bold-startup
- [x] Expose them to the form UI
- [x] Ensure selected preset is saved to project

### Deliverable
A project can store and display a selected style preset.

---

## Milestone 5 - Page schema and validation
- [x] Define TypeScript types for generated landing page
- [x] Add validation layer using Zod or equivalent
- [x] Create reusable schema/type file for:
  - [x] theme
  - [x] hero
  - [x] socialProof
  
  - [x] features
  - [x] howItWorks
  - [x] faq
  - [x] cta
- [x] Add parser/validator for model response

### Deliverable
The app has a typed validated schema for generated pages.

---

## Milestone 6 - LLM generation
- [x] Add OpenAI integration
- [x] Create generation prompt builder
- [ ] Prompt must include:
  - [x] form data
  - [x] selected style preset guidance
  - [x] strict JSON output instructions
  - [x] fixed page schema instructions
- [x] Build API route or server action for generation
- [x] Parse and validate response
- [x] Save valid output to `generated_page`
- [x] Add minimal error handling for invalid output

### Deliverable
A user can click Generate and get a valid saved landing page JSON object.

---

## Milestone 7 - Landing page renderer
- [ ] Create React components for:
  - [x] HeroSection
  - [x] SocialProofSection
  - [x] FeaturesSection
  - [x] HowItWorksSection
  - [x] FaqSection
  - [x] FinalCtaSection
- [x] Create preview page using `generated_page`
- [x] Apply theme colors from generated page
- [x] Make preview readable and polished enough for MVP

### Deliverable
The generated landing page can be previewed inside the app.

---

## Milestone 8 - Editing generated content
- [x] Build simple form-based editor for generated content
- [ ] Allow editing:
  - [x] hero headline/subheadline/CTAs
  - [x] feature items
  - [x] FAQ items
  - [x] CTA headline/button text
  - [x] social proof labels if present
- [x] Save edited content back to `generated_page`

### Deliverable
A user can manually improve the generated page before publishing.

---

## Milestone 9 - Publish flow
- [ ] Add publish action/button
- [ ] Generate unique slug if missing
- [ ] Set `published = true`
- [ ] Create public route `/p/[slug]`
- [ ] Render published page from DB data
- [ ] Handle unpublished/missing slugs gracefully

### Deliverable
A user can publish a landing page and access it via a public URL.

---

## Milestone 10 - MVP polish
- [x] Add loading states
- [x] Add empty states
- [x] Add basic error states
- [x] Protect project routes by auth
- [x] Ensure users can only access their own projects
- [ ] Test create -> generate -> edit -> publish flow
- [ ] Make app deployable

### Deliverable
An end-to-end MVP is functional and ready to share.

---

## Suggested File/Module Structure

```txt
app/
  dashboard/
  project/[id]/
  p/[slug]/
  api/generate/
  api/publish/

components/
  form/
  landing-page/

lib/
  auth/
  db/
  openai/
  prompts/
  style-presets/
  page-schema/
```

This can be adapted, but do not overcomplicate it.

---

## Suggested Build Order

1. App setup
2. Auth
3. Projects table/model
4. Create/open project
5. Guided form
6. Style presets
7. Page schema
8. LLM generation
9. Preview renderer
10. Simple editor
11. Publish route
12. Polish and deploy

---

## Definition of Done for MVP

The MVP is done when:

- [x] a user can sign in
- [x] a user can create a project
- [x] a user can submit the form
- [x] a landing page is generated from the form
- [x] the result is rendered in-app
- [x] the user can edit text fields
- [ ] the user can publish it
- [ ] a public URL works

---

## Important Implementation Principles

- Prefer fixed schemas over dynamic systems
- Prefer hardcoded presets over admin tooling
- Prefer synchronous implementation over async orchestration
- Prefer one good flow over many half-finished features
- Prefer shipping over extensibility
- Keep code simple, typed, and easy to refactor later

---

## Immediate Next Step

Continue with **Milestone 10** while publish stays deferred.

Next task:
- run a local demo-mode verification pass for dashboard -> project create -> project detail
- run a manual create -> intake save -> generate -> edit verification pass
- finish the deployment checklist for Vercel MVP readiness
- keep publish flow deferred until requested again

When polish is done, revisit publish only if requested.