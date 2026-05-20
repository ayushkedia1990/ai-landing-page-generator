import type { LandingPageHowItWorks } from "@/lib/page-schema";

type HowItWorksSectionProps = {
  howItWorks: LandingPageHowItWorks;
};

export function HowItWorksSection({ howItWorks }: HowItWorksSectionProps) {
  return (
    <section className="border-b border-black/5 px-6 py-10 sm:px-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">{howItWorks.headline}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {howItWorks.steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-black/8 bg-white/75 p-5 shadow-[0_12px_30px_rgba(16,19,35,0.05)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/65">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}