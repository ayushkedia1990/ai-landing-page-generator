import { z } from "zod";

import { defaultStylePreset, stylePresetIds } from "@/lib/style-presets";

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
    .max(120, "Product name must be 120 characters or fewer."),
  brandName: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters.")
    .max(80, "Brand name must be 80 characters or fewer."),
  oneLineDescription: z
    .string()
    .trim()
    .min(10, "Description should be at least 10 characters.")
    .max(120, "Description should be 120 characters or fewer."),
  targetAudience: z
    .string()
    .trim()
    .min(3, "Target audience must be at least 3 characters.")
    .max(80, "Target audience must be 80 characters or fewer."),
  primaryCta: z
    .string()
    .trim()
    .min(2, "Primary CTA must be at least 2 characters.")
    .max(120, "Primary CTA must be 120 characters or fewer."),
  mainCtaGoal: z.enum([
    "book-discovery",
    "purchase-now",
    "join-waitlist",
    "download-free-guide",
    "register-webinar",
  ] as const),
  tone: z
    .string()
    .trim()
    .min(2, "Tone must be at least 2 characters.")
    .max(40, "Tone must be 40 characters or fewer."),
  conversionLogic: z.enum(["AIDA", "D2C", "BAB", "PAS", "FAB", "STORYBRAND"] as const),
  font: z
    .string()
    .trim()
    .min(2, "Font selection is required.")
    .max(80, "Font selection must be 80 characters or fewer."),
  brandColors: z
    .object({
      primaryColor: z.string().optional(),
      backgroundColor: z.string().optional(),
      textColor: z.string().optional(),
      extraColors: z.array(z.string()).optional(),
    })
    .optional(),
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
  sections: z
    .array(
      z.enum([
        "hero",
        "socialProof",
        "problem",
        "features",
        "howItWorks",
        "visualDemo",
        "transformation",
        "testimonials",
        "comparison",
        "pricing",
        "faq",
        "finalCta",
        "leadMagnet",
        "backstory",
        "calendar",
      ] as const)
    )
    .default(["hero"]),
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