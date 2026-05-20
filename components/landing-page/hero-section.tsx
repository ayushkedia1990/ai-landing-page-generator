import type { LandingPageHero, LandingPageTheme } from "@/lib/page-schema";

type HeroSectionProps = {
  description: string;
  hero: LandingPageHero;
  theme: LandingPageTheme;
  title: string;
};

export function HeroSection({
  description,
  hero,
  theme,
  title,
}: HeroSectionProps) {
  return (
    <section className="border-b border-black/5 px-6 py-10 sm:px-10 sm:py-14">
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex rounded-full border border-black/8 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
          {theme.preset}
        </div>
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-black/55">
            {title}
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {hero.headline}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-black/70">{hero.subheadline}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-full px-6 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: theme.primaryColor }}
          >
            {hero.primaryCtaText}
          </button>
          <button
            type="button"
            className="rounded-full border border-black/10 bg-white/75 px-6 py-3 text-sm font-semibold"
          >
            {hero.secondaryCtaText}
          </button>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-black/55">{description}</p>
      </div>
    </section>
  );
}