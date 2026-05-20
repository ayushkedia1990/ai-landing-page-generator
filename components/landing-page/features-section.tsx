import type { LandingPageFeatures } from "@/lib/page-schema";

type FeaturesSectionProps = {
  features: LandingPageFeatures;
};

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className="border-b border-black/5 px-6 py-10 sm:px-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">{features.headline}</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.items.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-black/8 bg-white/75 p-5 shadow-[0_12px_30px_rgba(16,19,35,0.05)]"
            >
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/65">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}