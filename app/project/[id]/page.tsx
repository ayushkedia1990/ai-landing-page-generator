import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectIntakeForm } from "@/components/projects/project-intake-form";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { resolveStylePresetId, stylePresets } from "@/lib/style-presets";
import { getProjectIntakeDefaults } from "@/lib/validations/project";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
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
      published: true,
      updatedAt: true,
    },
  });

  if (!project) {
    notFound();
  }

  const intakeDefaults = getProjectIntakeDefaults(project.inputData);

  return (
    <main className="px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-5 rounded-4xl border border-border/80 bg-card-strong p-6 shadow-[0_20px_60px_rgba(16,19,35,0.1)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link
                href="/dashboard"
                className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
              >
                Dashboard
              </Link>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">{project.name}</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                Save the structured brief here. The next slice can generate the fixed
                landing page schema from this record without changing the data model.
              </p>
            </div>
            <div className="rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {project.status}
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <ProjectIntakeForm
            projectId={project.id}
            initialValues={{
              projectName: intakeDefaults.projectName ?? project.name,
              productName: intakeDefaults.productName ?? "",
              oneLineDescription: intakeDefaults.oneLineDescription ?? "",
              targetAudience: intakeDefaults.targetAudience ?? "",
              primaryCta: intakeDefaults.primaryCta ?? "",
              tone: intakeDefaults.tone ?? "",
              stylePreset:
                intakeDefaults.stylePreset ?? resolveStylePresetId(project.stylePreset),
              features: intakeDefaults.features ?? [],
              testimonials: intakeDefaults.testimonials ?? [],
              faqs: intakeDefaults.faqs ?? [],
            }}
            stylePresets={stylePresets}
          />

          <aside className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.08)]">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Project status
            </p>
            <dl className="mt-6 space-y-4 text-sm text-muted-foreground">
              <div>
                <dt className="font-semibold text-foreground">Selected preset</dt>
                <dd className="mt-1">{project.stylePreset}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Published</dt>
                <dd className="mt-1">{project.published ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Last updated</dt>
                <dd className="mt-1">{project.updatedAt.toLocaleDateString()}</dd>
              </div>
            </dl>

            <div className="mt-6 rounded-3xl bg-foreground px-4 py-5 text-sm leading-7 text-background">
              This route is the stable handoff point for generation, preview, and
              publish actions in later milestones.
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}