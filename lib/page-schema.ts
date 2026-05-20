import { z } from "zod";

import { type StylePreset, stylePresetIds } from "@/lib/style-presets";

const hexColorSchema = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, "Use a hex color value.");

const textField = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `${label} must be at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

export const landingPageThemeSchema = z.object({
  preset: z.enum(stylePresetIds),
  primaryColor: hexColorSchema,
  backgroundColor: hexColorSchema,
  textColor: hexColorSchema,
});

export const landingPageHeroSchema = z.object({
  headline: textField("Hero headline", 8, 120),
  subheadline: textField("Hero subheadline", 20, 280),
  primaryCtaText: textField("Primary CTA", 2, 40),
  secondaryCtaText: textField("Secondary CTA", 2, 40),
});

export const landingPageSocialProofSchema = z.object({
  headline: textField("Social proof headline", 6, 80),
  logos: z.array(textField("Social proof label", 2, 50)).min(3).max(6),
});

export const landingPageFeatureItemSchema = z.object({
  title: textField("Feature title", 3, 60),
  description: textField("Feature description", 12, 180),
});

export const landingPageFeaturesSchema = z.object({
  headline: textField("Features headline", 6, 90),
  items: z.array(landingPageFeatureItemSchema).min(3).max(6),
});

export const landingPageHowItWorksStepSchema = z.object({
  title: textField("Step title", 3, 60),
  description: textField("Step description", 12, 180),
});

export const landingPageHowItWorksSchema = z.object({
  headline: textField("How it works headline", 6, 90),
  steps: z.array(landingPageHowItWorksStepSchema).length(3),
});

export const landingPageFaqItemSchema = z.object({
  question: textField("FAQ question", 8, 140),
  answer: textField("FAQ answer", 16, 220),
});

export const landingPageFaqSchema = z.object({
  headline: textField("FAQ headline", 6, 90),
  items: z.array(landingPageFaqItemSchema).min(3).max(6),
});

export const landingPageCtaSchema = z.object({
  headline: textField("CTA headline", 8, 120),
  buttonText: textField("CTA button text", 2, 40),
});

export const landingPageSchema = z.object({
  theme: landingPageThemeSchema,
  page: z.object({
    title: textField("Page title", 5, 80),
    description: textField("Page description", 20, 180),
    hero: landingPageHeroSchema,
    socialProof: landingPageSocialProofSchema,
    features: landingPageFeaturesSchema,
    howItWorks: landingPageHowItWorksSchema,
    faq: landingPageFaqSchema,
    cta: landingPageCtaSchema,
  }),
});

export type LandingPage = z.infer<typeof landingPageSchema>;
export type LandingPageTheme = z.infer<typeof landingPageThemeSchema>;
export type LandingPageHero = z.infer<typeof landingPageHeroSchema>;
export type LandingPageSocialProof = z.infer<typeof landingPageSocialProofSchema>;
export type LandingPageFeatures = z.infer<typeof landingPageFeaturesSchema>;
export type LandingPageHowItWorks = z.infer<typeof landingPageHowItWorksSchema>;
export type LandingPageFaq = z.infer<typeof landingPageFaqSchema>;
export type LandingPageCta = z.infer<typeof landingPageCtaSchema>;

export function buildLandingPageTheme(preset: StylePreset): LandingPageTheme {
  return {
    preset: preset.id,
    primaryColor: preset.theme.primaryColor,
    backgroundColor: preset.theme.backgroundColor,
    textColor: preset.theme.textColor,
  };
}

export function parseLandingPage(value: unknown) {
  const parsed = landingPageSchema.safeParse(value);

  if (!parsed.success) {
    return null;
  }

  return parsed.data;
}

export const landingPageSchemaTemplate = JSON.stringify(
  {
    theme: {
      preset: "modern-saas | minimal-clean | bold-startup",
      primaryColor: "#000000",
      backgroundColor: "#ffffff",
      textColor: "#111111",
    },
    page: {
      title: "Short SEO-style page title",
      description: "Short meta description",
      hero: {
        headline: "Primary hero headline",
        subheadline: "Short subheadline that expands the value proposition",
        primaryCtaText: "Start now",
        secondaryCtaText: "See how it works",
      },
      socialProof: {
        headline: "Proof headline",
        logos: ["Trusted by growth teams", "Backed by founders", "Used in 20+ launches"],
      },
      features: {
        headline: "Feature section headline",
        items: [
          {
            title: "Feature title",
            description: "Feature description",
          },
        ],
      },
      howItWorks: {
        headline: "How it works headline",
        steps: [
          {
            title: "Step title",
            description: "Step description",
          },
        ],
      },
      faq: {
        headline: "FAQ headline",
        items: [
          {
            question: "FAQ question",
            answer: "FAQ answer",
          },
        ],
      },
      cta: {
        headline: "Final CTA headline",
        buttonText: "Book a demo",
      },
    },
  },
  null,
  2,
);