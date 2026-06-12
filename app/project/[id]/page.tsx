import Link from "next/link";
import { notFound } from "next/navigation";

import { GeneratedPageEditor } from "@/components/projects/generated-page-editor";
import { ProjectIntakeForm } from "@/components/projects/project-intake-form";
import { ProjectPreviewPanel } from "@/components/projects/project-preview-panel";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseLandingPage } from "@/lib/page-schema";
import { resolveStylePresetId, stylePresets } from "@/lib/style-presets";
import { getProjectIntakeDefaults, projectIntakeSchema } from "@/lib/validations/project";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const userId = await requireUser();

  const project = await db.project.findFirst({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
      name: true,
      status: true,
      stylePreset: true,
      inputData: true,
      generatedPage: true,
      published: true,
      updatedAt: true,
    },
  });

  if (!project) {
    notFound();
  }

  const intakeDefaults = getProjectIntakeDefaults(project.inputData);
  const generatedPage = parseLandingPage(project.generatedPage);
  const hasValidIntake = projectIntakeSchema.safeParse(project.inputData).success;
  const brandName = intakeDefaults.brandName ?? project.name;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-transparent">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-0">
        <aside className="border-b border-slate-200 bg-white/80 px-4 py-6 backdrop-blur-sm lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <Link
                href="/dashboard"
                className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 transition hover:text-slate-700"
              >
                ← Dashboard
              </Link>
              <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                {project.name}
              </h1>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
              {project.status}
            </span>
          </div>

          <ProjectIntakeForm
            projectId={project.id}
            initialValues={{
              projectName: intakeDefaults.projectName ?? project.name,
              productName: intakeDefaults.productName ?? "",
              brandName: intakeDefaults.brandName ?? "",
              oneLineDescription: intakeDefaults.oneLineDescription ?? "",
              targetAudience: intakeDefaults.targetAudience ?? "",
              primaryCta: intakeDefaults.primaryCta ?? "",
              mainCtaGoal: intakeDefaults.mainCtaGoal ?? "book-discovery",
              tone: intakeDefaults.tone ?? "",
              conversionLogic: intakeDefaults.conversionLogic ?? "AIDA",
              font: intakeDefaults.font ?? "Inter",
              stylePreset:
                intakeDefaults.stylePreset ?? resolveStylePresetId(project.stylePreset),
              features: intakeDefaults.features ?? [],
              testimonials: intakeDefaults.testimonials ?? [],
              faqs: intakeDefaults.faqs ?? [],
              sections: intakeDefaults.sections ?? ["hero"],
            }}
            stylePresets={stylePresets}
          />
        </aside>

        <section className="px-4 py-6 lg:px-6 lg:py-8">
          <ProjectPreviewPanel
            projectId={project.id}
            canGenerate={hasValidIntake}
            landingPage={generatedPage}
            brandName={brandName}
          />

          {generatedPage ? (
            <details className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Refine generated copy
              </summary>
              <div className="mt-6">
                <GeneratedPageEditor landingPage={generatedPage} projectId={project.id} />
              </div>
            </details>
          ) : null}
        </section>
      </div>
    </main>
  );
}
