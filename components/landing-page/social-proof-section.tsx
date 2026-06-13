import type { LandingPageSocialProof } from "@/lib/page-schema";

type SocialProofSectionProps = {
  socialProof: LandingPageSocialProof;
};

export function SocialProofSection({ socialProof }: SocialProofSectionProps) {
  return (
    <section className="border-b border-slate-200 px-6 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          {socialProof.headline}
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-700 sm:grid-cols-3 lg:grid-cols-4">
          {socialProof.logos.map((logo) => (
            <div
              key={logo}
              className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
