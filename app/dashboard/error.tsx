"use client";

type DashboardErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  void error;

  return (
    <main className="px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <section className="glass-panel rounded-4xl border border-danger/20 bg-danger/8 p-6 shadow-[0_20px_60px_rgba(16,19,35,0.1)] sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-danger">
            Dashboard error
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
            The dashboard could not load.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            This is a recoverable route error. Try the request again before changing any project data.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
            >
              Try again
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}