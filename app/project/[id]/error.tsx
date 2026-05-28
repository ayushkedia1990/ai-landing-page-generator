"use client";

import Link from "next/link";

type ProjectErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ProjectError({ error, reset }: ProjectErrorProps) {
  void error;

  return (
    <main className="px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <section className="glass-panel rounded-4xl border border-danger/20 bg-danger/8 p-6 shadow-[0_20px_60px_rgba(16,19,35,0.1)] sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-danger">
            Project error
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
            The project workspace could not load.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Ownership checks and route loading are in place, but this request still failed unexpectedly. Retry the route before editing or generating again.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
            >
              Try again
            </button>
            <Link
              href="/dashboard"
              className="rounded-full border border-border bg-card-strong px-5 py-3 text-sm font-semibold transition hover:bg-white"
            >
              Back to dashboard
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}