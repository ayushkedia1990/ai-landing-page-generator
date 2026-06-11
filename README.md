## AI Landing Page Generator MVP

This app generates structured landing page JSON from a guided intake form and renders it with fixed React sections.

### Current intake options supported by backend

- Offer: project name, product name, one-line description, target audience, outcome promise, unique advantage, primary CTA, CTA goal
- Conversion logic: AIDA, D2C, BAB, PAS, FAB, StoryBrand
- Branding identity: style preset, advanced style direction, tone, tone of voice, brand name, brand colors, font family, optional logo URL
- Section preferences: hero, social proof, problem, features, how-it-works, visual demo, transformation, testimonials, comparison, pricing, FAQ, final CTA, lead magnet, backstory, calendar
- Optional content: features list, testimonials, FAQs

Section preferences are included in the generation prompt. Sections outside the current fixed landing page schema are folded into supported sections until renderer expansion is added.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local setup notes

- The app expects PostgreSQL on port `5433` by default (`DATABASE_URL` in `.env.example`).
- If Clerk keys are omitted in development, local demo mode is used for project routes.
- Run Prisma setup after cloning:

```bash
npx prisma generate
npx prisma db push
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
