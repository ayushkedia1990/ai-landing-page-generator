import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { stylePresets } from "@/lib/style-presets";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="px-6 py-8 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-between gap-12">
        <header className="flex items-center justify-between rounded-full border border-border/80 bg-card-strong px-5 py-3 shadow-[0_14px_40px_rgba(16,19,35,0.08)]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
              AI Landing Page Generator
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium">
            <Link
              href="/sign-in"
              className="rounded-full px-4 py-2 text-muted-foreground transition hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-foreground px-4 py-2 text-background transition hover:opacity-90"
            >
              Start building
            </Link>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-border/80 bg-card px-4 py-2 text-sm text-muted-foreground shadow-[0_12px_30px_rgba(16,19,35,0.06)]">
              First milestone: sign in, create a project, save the guided brief.
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Turn a structured product brief into a polished landing page.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                This MVP keeps the workflow tight: sign in, capture the brief,
                choose a preset, then generate and publish from one app.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-foreground shadow-[0_16px_40px_rgba(23,105,255,0.28)] transition hover:-translate-y-0.5"
              >
                Create your account
              </Link>
              <Link
                href="/sign-in"
                className="rounded-full border border-border bg-card-strong px-6 py-3 text-center text-sm font-semibold transition hover:bg-white"
              >
                I already have access
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_20px_60px_rgba(16,19,35,0.12)] sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Fixed MVP presets
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Style guidance stays hardcoded.</h2>
              </div>
              <div className="rounded-full border border-border bg-card-strong px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                3 presets
              </div>
            </div>
            <div className="space-y-4">
              {stylePresets.map((preset) => (
                <div
                  key={preset.id}
                  className="rounded-3xl border border-border/80 bg-card-strong p-5 shadow-[0_10px_30px_rgba(16,19,35,0.06)]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{preset.label}</h3>
                    <div className="flex gap-2">
                      <span
                        className="h-4 w-4 rounded-full border border-black/10"
                        style={{ backgroundColor: preset.theme.primaryColor }}
                      />
                      <span
                        className="h-4 w-4 rounded-full border border-black/10"
                        style={{ backgroundColor: preset.theme.backgroundColor }}
                      />
                      <span
                        className="h-4 w-4 rounded-full border border-black/10"
                        style={{ backgroundColor: preset.theme.textColor }}
                      />
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{preset.promptHint}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
