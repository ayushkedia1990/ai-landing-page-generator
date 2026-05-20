import type { LandingPageCta, LandingPageTheme } from "@/lib/page-schema";

type FinalCtaSectionProps = {
  cta: LandingPageCta;
  theme: LandingPageTheme;
};

export function FinalCtaSection({ cta, theme }: FinalCtaSectionProps) {
  return (
    <section className="px-6 py-10 sm:px-10 sm:py-14">
      <div
        className="rounded-[28px] p-8 text-white shadow-[0_20px_50px_rgba(16,19,35,0.12)] sm:p-10"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <div className="max-w-3xl space-y-5">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {cta.headline}
          </h2>
          <button
            type="button"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold"
            style={{ color: theme.primaryColor }}
          >
            {cta.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}