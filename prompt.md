You are helping me build a **1-week MVP** for an AI landing page generator product.

I am a full stack developer and I want to move fast. Do not design a scalable long-term platform yet. Optimize for **shipping a working MVP in 1 week** with the **minimum architecture and feature set** necessary to validate demand.

Your job is to help me **start the project and take the first implementation steps**.

## Working File Update Rule

Whenever `prompt.md` or `TASKS.md` are present in prompt context, update both files during that run.

Each update must capture:
- completed work since the previous update
- the current implementation slice
- the next planned slice
- any changed assumptions or blockers

## Current Build Status

Last updated: 2026-05-20

Completed so far:
- App scaffold, auth, Prisma project model, dashboard shell
- Project creation flow with persistence
- Guided intake form with saved `input_data`
- Hardcoded style presets
- Fixed landing page schema and validation
- OpenAI generation flow that saves `generated_page`
- In-app landing page preview
- Simple generated content editor for hero, social proof labels, features, FAQ items, and final CTA text
- Local development database wiring fixed with a real root `DATABASE_URL`
- Local Docker Postgres is running on port `5433` and Prisma connectivity is verified

Current planned next slice:
- Publish flow at `/p/[slug]`
- Final polish for empty states, error handling, auth checks, and deploy readiness

Current blocker/status notes:
- No active blocker from Prisma setup. Local development uses Docker PostgreSQL on port `5433` to avoid an existing port `5432` container.

## Core product goal

Build a web app where a user can:

1. sign in
2. create a project
3. fill out a guided form
4. select a style preset
5. generate a landing page using an LLM
6. preview and make simple text edits
7. publish the page to a public hosted URL

This is **not** a no-code website builder.
This is **not** a full website platform.
This is **not** a multi-page site generator.
This is **not** a custom-domain/billing/analytics/team platform yet.

It is only:

> “Generate and publish a decent landing page from a guided form.”

---

## Important constraints

- MVP must be shippable within **1 week**
- Use a **simple monolithic architecture**
- Prefer **hardcoded configs** over admin systems
- Prefer **fixed schemas** over flexible dynamic systems
- Prefer **working end-to-end** over extensibility
- Do not overengineer
- Do not build microservices
- Do not build queues/workers unless absolutely necessary
- Do not build a drag-and-drop editor
- Do not build advanced versioning
- Do not build billing
- Do not build analytics dashboards
- Do not build custom domain management
- Do not build image generation
- Do not build vector search
- Do not build team/workspace support

---

## Recommended stack

Use this stack unless there is a strong reason not to:

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- PostgreSQL
- Prisma or Drizzle
- Clerk / Supabase Auth / NextAuth (choose the fastest-to-ship option)
- OpenAI API for generation
- Vercel for deployment

If there is no existing codebase, scaffold the project accordingly.

---

## Architecture constraints

Use a **single app** architecture for MVP.

Keep everything in one codebase.

### Backend/data model

For MVP, keep the data model very small.

We likely only need a `projects` table with fields similar to:

- id
- user_id
- name
- status
- style_preset
- input_data (json/jsonb)
- generated_page (json/jsonb)
- published
- published_slug
- created_at
- updated_at

Do not add lots of extra tables unless absolutely necessary for the first working version.

---

## Product scope for MVP

### Must have
- auth
- dashboard or project list
- create project
- guided landing page intake form
- 3 style presets
- generate landing page from LLM
- save generated page in DB
- preview generated page
- simple text editing for generated content
- publish flow
- public route for published landing page

### Nice to have only if easy
- duplicate project
- regenerate entire page
- copy public URL

### Must NOT implement now
- teams/workspaces
- billing
- subscriptions
- custom domains
- analytics dashboard
- lead capture backend
- AI section regeneration
- design system CMS
- image uploads unless trivial
- asset pipeline
- multiple LLM providers
- async queue workers
- advanced retry orchestration
- section drag-drop
- page version history
- multi-page site generation

---

## Guided form requirements

The landing page should be generated from a **structured form**, not a freeform prompt box.

The form should include only the essential fields needed for MVP.

Suggested fields:

- project name
- product name
- one-line description
- target audience
- primary CTA
- style preset
- tone
- optional features list
- optional testimonials
- optional FAQs

Keep the form small and practical.

---

## Style system requirements

Do not build a dynamic rules engine.

Instead, hardcode exactly **3 style presets** in code, something like:

- modern-saas
- minimal-clean
- bold-startup

Each preset should have:
- label
- prompt hint
- default colors or theme values

Example direction:

- `modern-saas`: clean SaaS look, soft shadows, product-focused copy
- `minimal-clean`: whitespace-heavy, restrained, elegant hierarchy
- `bold-startup`: high contrast, energetic, louder marketing tone

Keep these as code constants/config files, not DB-managed entities.

---

## Landing page generation constraints

For MVP, do **not** let the model invent arbitrary page structures.

Use a **fixed landing page schema** with a fixed set of sections.

Suggested sections:
- hero
- socialProof
- features
- howItWorks (optional but useful)
- faq
- cta

If needed, you may drop one section to simplify, but keep the structure fixed.

The LLM should only generate content that fits this schema.

Do **not** generate raw HTML/CSS as the source of truth.

The source of truth should be a structured JSON object representing the landing page.

---

## Suggested generated page shape

Use a simple object like this conceptually:

- theme
  - preset
  - primaryColor
  - backgroundColor
  - textColor

- page
  - title
  - description
  - hero
    - headline
    - subheadline
    - primaryCtaText
    - secondaryCtaText
  - socialProof
    - headline
    - logos
  - features
    - headline
    - items[]
  - howItWorks
    - headline
    - steps[]
  - faq
    - headline
    - items[]
  - cta
    - headline
    - buttonText

Use strong typing and validation.

---

## Rendering requirements

Build a simple renderer using React components for fixed sections, such as:

- HeroSection
- SocialProofSection
- FeaturesSection
- HowItWorksSection
- FaqSection
- FinalCtaSection

The generated JSON should feed these components directly.

Do not build a drag-and-drop layout system.

---

## Editing requirements

For MVP, keep editing simple.

Users only need to be able to:
- edit hero text
- edit feature items
- edit FAQ items
- edit CTA text
- maybe edit social proof labels

This can be a form-based editor bound to the stored JSON.

Do not build a visual page builder.

---

## Publishing requirements

Publishing should be extremely simple.

When the user clicks Publish:
- set `published = true`
- generate a unique slug if missing
- expose a public route like `/p/[slug]`

The public route should render the page from stored DB data.

Do not implement:
- custom domains
- static export pipelines
- CDN invalidation systems
- advanced deployment state machines

For MVP, DB-backed public rendering is acceptable.

---

## LLM integration requirements

Use the LLM only for generating structured landing page content.

The generation flow should be:

1. user submits guided form
2. backend loads selected style preset
3. backend constructs prompt with:
   - form input
   - style preset guidance
   - strict output schema
4. call model
5. parse structured JSON
6. validate output
7. save to DB
8. show preview

Keep this synchronous if possible for MVP.

Do not build a complex orchestration pipeline yet.

---

## Prompting requirements

The LLM prompt should:
- enforce a fixed JSON schema
- tell the model to return valid JSON only
- use the selected style preset guidance
- use the provided product/audience/CTA inputs
- generate concise, plausible marketing copy

Do not ask the model to output raw code or HTML.

Use schema validation on the server after generation.

If validation fails, implement the smallest practical retry/fallback approach.

---

## File/folder structure direction

Use a simple structure similar to:

- app/
  - dashboard/
  - project/[id]/
  - p/[slug]/
  - api/generate/
  - api/publish/
- components/
  - landing-page/
  - form/
- lib/
  - db
  - auth
  - openai
  - style-presets
  - prompts
  - page-schema

You can adjust the exact structure if needed, but keep it simple and clean.

---

## Suggested implementation order

Follow this order unless you have a better reason:

### Phase 1
Set up the app foundation:
- scaffold project
- auth
- DB setup
- project model
- basic dashboard / create project flow

### Phase 2
Build the guided intake form:
- form page
- save input_data
- style preset selection

### Phase 3
Build generation:
- page schema/type
- style preset config
- generation prompt
- API/server action for generation
- save generated page

### Phase 4
Build rendering:
- landing page preview renderer
- fixed sections

### Phase 5
Build editing:
- simple form-based editor for generated content
- save updated JSON

### Phase 6
Build publishing:
- publish button
- slug generation
- public page route

### Phase 7
Polish:
- empty states
- basic error handling
- deployability

---

## What I want from you right now

I do **not** want a big abstract plan only.

I want you to continue implementation from the current app state.

Please do the following on each run:

1. read the current status in this file and in `TASKS.md`
2. update both files as you work so they stay current
3. identify the next unfinished MVP slice
4. implement that slice directly in code
5. validate the changes before stopping

Do not restart discovery from zero when the current repo state and progress notes already answer that.

---

## First milestone definition

The first milestone should be something like:

> “A user can sign in, create a project, and save the guided input form.”

That is a good first vertical slice.

Do not jump straight into advanced LLM flows before the basic app skeleton and persistence exist.

---

## Decision-making principles

When making choices, prefer:
- faster shipping
- fewer abstractions
- fewer moving parts
- strong typing
- fixed schemas
- sensible defaults
- hardcoded configs where appropriate

Avoid:
- speculative architecture
- premature optimization
- unnecessary indirection
- dynamic plugin systems
- generalizing too early

---

## Output style I want from you

I want you to work like an implementation partner.

That means:
- inspect the codebase first
- explain briefly what you found
- propose the immediate next step
- then make concrete code changes

When you create files or modify code, keep the implementation practical and MVP-focused.

If you need to make assumptions, choose the option that is simplest and fastest to ship.

Start now with the **first implementation step**.