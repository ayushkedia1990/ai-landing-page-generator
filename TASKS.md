# AI Landing Page Generator MVP - Tasks

## Goal

Ship a working MVP in **1 week**.

## Update Protocol

- Whenever `prompt.md` or `TASKS.md` are in prompt context, update both files during that run.
- Each update must include completed work, the current slice, the next planned slice, and any task checkbox changes.

## Current Status

Last updated: 2026-05-20

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

Current planned next slice:
- Milestone 9 publish flow at `/p/[slug]`
- Milestone 10 polish for empty states, error handling, and deploy readiness

Current blocker/status notes:
- No active blocker from Prisma setup. Local Postgres is being provided through Docker on port `5433` because no Windows PostgreSQL service was present and port `5432` was already in use.

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
- [ ] Add loading states
- [ ] Add empty states
- [ ] Add basic error states
- [ ] Protect project routes by auth
- [ ] Ensure users can only access their own projects
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

Continue with **Milestone 9**.

Next task:
- add a publish action/button on the project detail page
- generate and persist a unique `published_slug`
- set `published = true`
- create the public route at `/p/[slug]`
- render the saved `generated_page` from the database

After publish works, move to Milestone 10 polish.