import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <section className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_20px_60px_rgba(16,19,35,0.1)] sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Project unavailable
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
            This project does not exist or you do not have access to it.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Project routes are scoped to the signed-in owner. If you opened an old link or another user&apos;s project URL, return to the dashboard and choose a project from your own list.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
            >
              Back to dashboard
            </Link>
            <Link
              href="/"
              className="rounded-full border border-border bg-card-strong px-5 py-3 text-sm font-semibold transition hover:bg-white"
            >
              Go home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}