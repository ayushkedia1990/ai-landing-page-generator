"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { defaultStylePreset } from "@/lib/style-presets";
import { createProjectSchema } from "@/lib/validations/project";

export type CreateProjectState = {
  errors?: {
    name?: string[];
  };
  message?: string;
};

export async function createProject(
  _: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  const userId = await requireUser();

  const validatedFields = createProjectSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Choose a project name before continuing.",
    };
  }

  const project = await db.project.create({
    data: {
      userId,
      name: validatedFields.data.name,
      stylePreset: defaultStylePreset,
      inputData: {
        projectName: validatedFields.data.name,
        stylePreset: defaultStylePreset,
      },
    },
    select: {
      id: true,
    },
  });

  revalidatePath("/dashboard");
  redirect(`/project/${project.id}`);
}