# AI Landing Page Generator MVP - Tasks

## Goal

Ship a working MVP in **1 week**.

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
- [ ] Inspect repo and identify current stack/state
- [ ] If repo is empty, scaffold the app
- [ ] Set up Next.js + TypeScript + Tailwind
- [ ] Set up auth
- [ ] Set up DB connection
- [ ] Define initial project model/schema
- [ ] Create base app shell / dashboard layout

### Deliverable
A user can sign in and reach a dashboard.

---

## Milestone 2 - Project creation
- [ ] Create project list page
- [ ] Create new project flow
- [ ] Persist project in DB
- [ ] Add project detail page route

### Deliverable
A signed-in user can create and open a project.

---

## Milestone 3 - Guided form input
- [ ] Build guided intake form
- [ ] Include fields:
  - [ ] project name
  - [ ] product name
  - [ ] one-line description
  - [ ] target audience
  - [ ] primary CTA
  - [ ] tone
  - [ ] style preset
  - [ ] optional features list
  - [ ] optional testimonials
  - [ ] optional FAQs
- [ ] Save form data to `input_data`
- [ ] Load saved form data for editing

### Deliverable
A user can fill and save the landing page input form.

---

## Milestone 4 - Style preset config
- [ ] Create hardcoded style preset config file
- [ ] Add 3 presets:
  - [ ] modern-saas
  - [ ] minimal-clean
  - [ ] bold-startup
- [ ] Expose them to the form UI
- [ ] Ensure selected preset is saved to project

### Deliverable
A project can store and display a selected style preset.

---

## Milestone 5 - Page schema and validation
- [ ] Define TypeScript types for generated landing page
- [ ] Add validation layer using Zod or equivalent
- [ ] Create reusable schema/type file for:
  - [ ] theme
  - [ ] hero
  - [ ] socialProof
  - [ ] features
  - [ ] howItWorks
  - [ ] faq
  - [ ] cta
- [ ] Add parser/validator for model response

### Deliverable
The app has a typed validated schema for generated pages.

---

## Milestone 6 - LLM generation
- [ ] Add OpenAI integration
- [ ] Create generation prompt builder
- [ ] Prompt must include:
  - [ ] form data
  - [ ] selected style preset guidance
  - [ ] strict JSON output instructions
  - [ ] fixed page schema instructions
- [ ] Build API route or server action for generation
- [ ] Parse and validate response
- [ ] Save valid output to `generated_page`
- [ ] Add minimal error handling for invalid output

### Deliverable
A user can click Generate and get a valid saved landing page JSON object.

---

## Milestone 7 - Landing page renderer
- [ ] Create React components for:
  - [ ] HeroSection
  - [ ] SocialProofSection
  - [ ] FeaturesSection
  - [ ] HowItWorksSection
  - [ ] FaqSection
  - [ ] FinalCtaSection
- [ ] Create preview page using `generated_page`
- [ ] Apply theme colors from generated page
- [ ] Make preview readable and polished enough for MVP

### Deliverable
The generated landing page can be previewed inside the app.

---

## Milestone 8 - Editing generated content
- [ ] Build simple form-based editor for generated content
- [ ] Allow editing:
  - [ ] hero headline/subheadline/CTAs
  - [ ] feature items
  - [ ] FAQ items
  - [ ] CTA headline/button text
  - [ ] social proof labels if present
- [ ] Save edited content back to `generated_page`

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

- [ ] a user can sign in
- [ ] a user can create a project
- [ ] a user can submit the form
- [ ] a landing page is generated from the form
- [ ] the result is rendered in-app
- [ ] the user can edit text fields
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

Start with **Milestone 1**.

First task:
- inspect the current repo
- identify what already exists
- determine whether to scaffold or extend
- then implement the first end-to-end slice:

> sign in + dashboard + create project + persist project

Do not jump into LLM generation before the project creation flow exists.