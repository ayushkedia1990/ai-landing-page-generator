import type { LandingPageHero, LandingPageTheme } from "@/lib/page-schema";

type HeroSectionProps = {
  title: string;
  description: string;
  hero: LandingPageHero;
  theme: LandingPageTheme;
};

export function HeroSection({
  description,
  hero,
  theme,
  title,
}: HeroSectionProps) {
  return (
    <section className="border-b border-slate-200 px-6 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-white/80 bg-white/90 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm shadow-slate-900/5">
            {title}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {hero.headline}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">
              {hero.subheadline}
            </p>
          </div>

          <div className="grid gap-4 sm:max-w-md sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <button
              type="button"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.16)] transition hover:bg-slate-800"
            >
              {hero.primaryCtaText}
            </button>
            <button
              type="button"
              className="rounded-full border border-white/80 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              {hero.secondaryCtaText}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-2 shadow-sm shadow-slate-900/5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-600 text-white">▶</span>
              Watch video
            </span>
            <span className="text-slate-500">{description}</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[2rem] border border-white/80 bg-slate-100 shadow-[0_35px_90px_rgba(15,23,42,0.12)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_40%)]" />
          <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-100 via-slate-200 to-white">
            <div className="absolute inset-0 flex justify-end p-6">
              <div className="h-full w-[45%] rounded-[1.75rem] bg-slate-200 shadow-inner" />
            </div>
            <div className="absolute left-6 bottom-6 rounded-[1.5rem] bg-white/90 px-4 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <p className="text-sm font-semibold text-slate-950">Fiona Hahn</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                Life Coach and Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
