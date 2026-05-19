import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { CreateProjectForm } from "@/components/projects/create-project-form";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const userId = await requireUser();

  const projects = await db.project.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      status: true,
      stylePreset: true,
      updatedAt: true,
    },
  });

  return (
    <main className="px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="glass-panel flex flex-col gap-6 rounded-4xl border border-border/80 p-6 shadow-[0_20px_60px_rgba(16,19,35,0.1)] sm:p-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Dashboard
            </p>
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight">Start with a project brief.</h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Keep the first slice narrow: create a project, capture the guided
                intake, and store everything in one place before generation.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 self-start rounded-full border border-border bg-card-strong px-4 py-2">
            <span className="text-sm text-muted-foreground">Account</span>
            <UserButton />
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.08)]">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              New project
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Create the workspace record first.</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Each project stores the intake form, selected preset, generated page,
              and publish state in a single row for MVP speed.
            </p>
            <div className="mt-6">
              <CreateProjectForm />
            </div>
          </aside>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your projects</h2>
              <span className="rounded-full border border-border bg-card-strong px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {projects.length} total
              </span>
            </div>

            {projects.length === 0 ? (
              <div className="glass-panel rounded-4xl border border-dashed border-border/90 p-8 text-center shadow-[0_18px_50px_rgba(16,19,35,0.06)]">
                <p className="text-lg font-semibold">No projects yet.</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Create the first one, then fill in the landing page brief on its
                  detail screen.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/project/${project.id}`}
                    className="glass-panel rounded-4xl border border-border/80 p-6 transition hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_22px_60px_rgba(16,19,35,0.12)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                          {project.stylePreset}
                        </p>
                      </div>
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                        {project.status}
                      </span>
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground">
                      Updated {project.updatedAt.toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}