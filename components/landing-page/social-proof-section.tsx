import type { LandingPageSocialProof } from "@/lib/page-schema";

type SocialProofSectionProps = {
  socialProof: LandingPageSocialProof;
};

export function SocialProofSection({ socialProof }: SocialProofSectionProps) {
  return (
    <section className="border-b border-black/5 px-6 py-8 sm:px-10">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">{socialProof.headline}</h2>
        <div className="flex flex-wrap gap-3">
          {socialProof.logos.map((logo) => (
            <span
              key={logo}
              className="rounded-full border border-black/8 bg-white/75 px-4 py-2 text-sm font-medium text-black/70"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}