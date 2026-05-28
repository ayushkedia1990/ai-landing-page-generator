function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-3xl bg-card ${className}`} />;
}

export default function ProjectLoading() {
  return (
    <main className="px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-4xl border border-border/80 bg-card-strong p-6 shadow-[0_20px_60px_rgba(16,19,35,0.1)] sm:p-8">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="mt-4 h-10 w-72" />
          <SkeletonBlock className="mt-4 h-4 w-full max-w-2xl" />
          <SkeletonBlock className="mt-3 h-4 w-full max-w-xl" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.08)] sm:p-8">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="mt-4 h-8 w-60" />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-24 w-full" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.08)]">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="mt-4 h-8 w-52" />
              <SkeletonBlock className="mt-4 h-4 w-full" />
              <SkeletonBlock className="mt-8 h-12 w-full rounded-full" />
            </div>

            <div className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.08)]">
              <SkeletonBlock className="h-4 w-28" />
              <div className="mt-6 space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-10 w-full" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <SkeletonBlock className="h-4 w-20" />
          <SkeletonBlock className="h-8 w-64" />
          <div className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.06)]">
            <SkeletonBlock className="h-72 w-full" />
          </div>
        </section>
      </div>
    </main>
  );
}