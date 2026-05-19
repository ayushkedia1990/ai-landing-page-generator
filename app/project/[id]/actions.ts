"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  projectIntakeSchema,
  toLineItems,
} from "@/lib/validations/project";

export type SaveProjectIntakeState = {
  errors?: Record<string, string[]>;
  message?: string;
  saved?: boolean;
};

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
      message: "Fix the highlighted fields and save again.",
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
      message: "Project not found.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/project/${projectId}`);

  return {
    message: "Intake saved.",
    saved: true,
  };
}