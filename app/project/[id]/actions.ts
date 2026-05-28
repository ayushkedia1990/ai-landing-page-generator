"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateLandingPage } from "@/lib/openai";
import { landingPageSchema, parseLandingPage } from "@/lib/page-schema";
import { getStylePreset, resolveStylePresetId } from "@/lib/style-presets";
import {
  projectIntakeSchema,
  toLineItems,
} from "@/lib/validations/project";

export type SaveProjectIntakeState = {
  errors?: Record<string, string[]>;
  error?: string;
  message?: string;
  saved?: boolean;
};

export type GenerateProjectPageState = {
  error?: string;
  message?: string;
  generated?: boolean;
};

export type SaveGeneratedPageEditsState = {
  error?: string;
  issues?: string[];
  message?: string;
  saved?: boolean;
};

function getTextValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveProjectIntake(
  projectId: string,
  _: SaveProjectIntakeState,
  formData: FormData,
): Promise<SaveProjectIntakeState> {
  const userId = await requireUser();

  const validatedFields = projectIntakeSchema.safeParse({
    projectName: formData.get("projectName"),
    productName: formData.get("productName"),
    oneLineDescription: formData.get("oneLineDescription"),
    targetAudience: formData.get("targetAudience"),
    primaryCta: formData.get("primaryCta"),
    tone: formData.get("tone"),
    stylePreset: formData.get("stylePreset"),
    features: toLineItems(formData.get("features")),
    testimonials: toLineItems(formData.get("testimonials")),
    faqs: toLineItems(formData.get("faqs")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      error: "Fix the highlighted fields and save again.",
    };
  }

  const result = await db.project.updateMany({
    where: {
      id: projectId,
      userId,
    },
    data: {
      name: validatedFields.data.projectName,
      status: "intake-complete",
      stylePreset: validatedFields.data.stylePreset,
      inputData: validatedFields.data,
    },
  });

  if (result.count === 0) {
    return {
      error: "Project not found.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/project/${projectId}`);

  return {
    message: "Intake saved. Generation now uses the latest project brief.",
    saved: true,
  };
}

export async function generateProjectPage(
  projectId: string,
  state: GenerateProjectPageState,
  formData: FormData,
): Promise<GenerateProjectPageState> {
  void state;
  void formData;

  const userId = await requireUser();

  const project = await db.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
    select: {
      id: true,
      inputData: true,
      stylePreset: true,
    },
  });

  if (!project) {
    return {
      error: "Project not found.",
    };
  }

  const validatedInput = projectIntakeSchema.safeParse(project.inputData);

  if (!validatedInput.success) {
    return {
      error: "Save the complete guided intake before generating the landing page.",
    };
  }

  const preset = getStylePreset(resolveStylePresetId(project.stylePreset));

  try {
    const generatedPage = await generateLandingPage({
      preset,
      project: validatedInput.data,
    });

    await db.project.update({
      where: {
        id: project.id,
      },
      data: {
        generatedPage,
        status: "generated",
        stylePreset: preset.id,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/project/${projectId}`);

    return {
      generated: true,
      message: "Landing page generated and saved. Scroll down to review the draft and editor.",
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate the landing page.",
    };
  }
}

export async function saveGeneratedPageEdits(
  projectId: string,
  state: SaveGeneratedPageEditsState,
  formData: FormData,
): Promise<SaveGeneratedPageEditsState> {
  void state;

  const userId = await requireUser();

  const project = await db.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
    select: {
      id: true,
      generatedPage: true,
    },
  });

  if (!project) {
    return {
      error: "Project not found.",
    };
  }

  const existingPage = parseLandingPage(project.generatedPage);

  if (!existingPage) {
    return {
      error: "Generate a landing page before trying to edit it.",
    };
  }

  const updatedPage = {
    ...existingPage,
    page: {
      ...existingPage.page,
      hero: {
        headline: getTextValue(formData, "heroHeadline"),
        subheadline: getTextValue(formData, "heroSubheadline"),
        primaryCtaText: getTextValue(formData, "heroPrimaryCtaText"),
        secondaryCtaText: getTextValue(formData, "heroSecondaryCtaText"),
      },
      socialProof: {
        ...existingPage.page.socialProof,
        logos: toLineItems(formData.get("socialProofLogos")),
      },
      features: {
        ...existingPage.page.features,
        items: existingPage.page.features.items.map((_, index) => ({
          title: getTextValue(formData, `featureTitle-${index}`),
          description: getTextValue(formData, `featureDescription-${index}`),
        })),
      },
      faq: {
        ...existingPage.page.faq,
        items: existingPage.page.faq.items.map((_, index) => ({
          question: getTextValue(formData, `faqQuestion-${index}`),
          answer: getTextValue(formData, `faqAnswer-${index}`),
        })),
      },
      cta: {
        headline: getTextValue(formData, "ctaHeadline"),
        buttonText: getTextValue(formData, "ctaButtonText"),
      },
    },
  };

  const validatedPage = landingPageSchema.safeParse(updatedPage);

  if (!validatedPage.success) {
    return {
      error: "Fix the generated content fields and save again.",
      issues: validatedPage.error.issues.slice(0, 6).map((issue) => {
        const path = issue.path.join(".");
        return path ? `${path}: ${issue.message}` : issue.message;
      }),
    };
  }

  await db.project.update({
    where: {
      id: project.id,
    },
    data: {
      generatedPage: validatedPage.data,
      status: "edited",
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/project/${projectId}`);

  return {
    message: "Generated page edits saved. This project now uses the updated copy.",
    saved: true,
  };
}