function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-3xl bg-card ${className}`} />;
}

export default function DashboardLoading() {
  return (
    <main className="px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_20px_60px_rgba(16,19,35,0.1)] sm:p-8">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="mt-4 h-10 w-72" />
          <SkeletonBlock className="mt-4 h-4 w-full max-w-2xl" />
          <SkeletonBlock className="mt-3 h-4 w-full max-w-xl" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.08)]">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="mt-4 h-8 w-56" />
            <SkeletonBlock className="mt-4 h-4 w-full" />
            <SkeletonBlock className="mt-3 h-4 w-full" />
            <SkeletonBlock className="mt-8 h-12 w-full rounded-full" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <SkeletonBlock className="h-8 w-40" />
              <SkeletonBlock className="h-8 w-20 rounded-full" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.06)]"
                >
                  <SkeletonBlock className="h-7 w-40" />
                  <SkeletonBlock className="mt-3 h-4 w-24" />
                  <SkeletonBlock className="mt-8 h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}