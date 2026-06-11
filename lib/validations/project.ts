import { z } from "zod";

import { defaultStylePreset, stylePresetIds } from "@/lib/style-presets";

const hexColorSchema = z
  .string()
  .trim()
  .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, "Use a hex color like #2563eb.");

export const ctaGoalOptions = [
  "book-discovery-call",
  "purchase-now",
  "join-waitlist",
  "download-free-guide",
  "register-for-webinar",
] as const;

export const conversionFrameworkOptions = [
  "aida",
  "d2c",
  "bab",
  "pas",
  "fab",
  "storybrand",
] as const;

export const styleDirectionOptions = [
  "editorial",
  "premium-luxury",
  "glassmorphism",
  "soft-ui",
  "bento-grid",
  "material-design",
  "neo-brutalism",
] as const;

export const toneOfVoiceOptions = [
  "professional-authoritative",
  "friendly-conversational",
  "luxury-exclusive",
  "energetic-motivational",
  "calm-spiritual",
] as const;

export const includeSectionOptions = [
  "hero",
  "social-proof-trust-bar",
  "problem",
  "features",
  "how-it-works",
  "visual-demo",
  "transformation-benefits",
  "testimonials-case-studies",
  "comparison",
  "pricing",
  "faq",
  "final-cta",
  "lead-magnet",
  "backstory",
  "calendar",
] as const;

export const fontFamilyOptions = [
  "Inter",
  "Roboto",
  "Segoe UI Symbol",
  "Noto Traditional Nushu",
  "NTR",
  "Odor Mean Chey",
  "Offside",
] as const;

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters.")
    .max(80, "Project name must be 80 characters or fewer."),
});

export const projectIntakeSchema = z.object({
  projectName: createProjectSchema.shape.name,
  productName: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters.")
    .max(80, "Product name must be 80 characters or fewer."),
  oneLineDescription: z
    .string()
    .trim()
    .min(10, "Description should be at least 10 characters.")
    .max(200, "Description should be 200 characters or fewer."),
  targetAudience: z
    .string()
    .trim()
    .min(3, "Target audience must be at least 3 characters.")
    .max(120, "Target audience must be 120 characters or fewer."),
  outcomePromise: z
    .string()
    .trim()
    .min(10, "Outcome promise should be at least 10 characters.")
    .max(240, "Outcome promise should be 240 characters or fewer."),
  uniqueAdvantage: z
    .string()
    .trim()
    .min(10, "Unique advantage should be at least 10 characters.")
    .max(240, "Unique advantage should be 240 characters or fewer."),
  primaryCta: z
    .string()
    .trim()
    .min(2, "Primary CTA must be at least 2 characters.")
    .max(40, "Primary CTA must be 40 characters or fewer."),
  ctaGoal: z.enum(ctaGoalOptions).default("book-discovery-call"),
  conversionFrameworks: z
    .array(z.enum(conversionFrameworkOptions))
    .min(1, "Select at least one conversion framework.")
    .max(6)
    .default(["aida"]),
  tone: z
    .string()
    .trim()
    .min(2, "Tone must be at least 2 characters.")
    .max(40, "Tone must be 40 characters or fewer."),
  toneOfVoice: z
    .enum(toneOfVoiceOptions)
    .default("professional-authoritative"),
  styleDirection: z
    .enum(styleDirectionOptions)
    .default("editorial"),
  brandName: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters.")
    .max(80, "Brand name must be 80 characters or fewer."),
  brandColors: z
    .array(hexColorSchema)
    .min(1, "Provide at least one brand color.")
    .max(5, "Provide up to 5 brand colors."),
  fontFamily: z.enum(fontFamilyOptions).default("Inter"),
  logoUrl: z
    .string()
    .trim()
    .max(300, "Logo URL must be 300 characters or fewer.")
    .optional()
    .or(z.literal(""))
    .default(""),
  includeSections: z
    .array(z.enum(includeSectionOptions))
    .min(1, "Select at least one section to include.")
    .max(includeSectionOptions.length)
    .default(["hero", "features", "faq", "final-cta"]),
  stylePreset: z.enum(stylePresetIds).default(defaultStylePreset),
  features: z
    .array(z.string().trim().min(1).max(120))
    .max(8, "Keep the features list to 8 items or fewer.")
    .default([]),
  testimonials: z
    .array(z.string().trim().min(1).max(220))
    .max(6, "Keep testimonials to 6 items or fewer.")
    .default([]),
  faqs: z
    .array(z.string().trim().min(1).max(220))
    .max(10, "Keep FAQs to 10 items or fewer.")
    .default([]),
});

export type ProjectIntakeInput = z.infer<typeof projectIntakeSchema>;

export function toLineItems(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getProjectIntakeDefaults(inputData: unknown) {
  const parsed = projectIntakeSchema.partial().safeParse(inputData);

  if (!parsed.success) {
    return {} as Partial<ProjectIntakeInput>;
  }

  return parsed.data;
}