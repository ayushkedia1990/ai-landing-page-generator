import { FaqSection } from "@/components/landing-page/faq-section";
import { FeaturesSection } from "@/components/landing-page/features-section";
import { FinalCtaSection } from "@/components/landing-page/final-cta-section";
import { HeroSection } from "@/components/landing-page/hero-section";
import { HowItWorksSection } from "@/components/landing-page/how-it-works-section";
import { SocialProofSection } from "@/components/landing-page/social-proof-section";
import type { LandingPage } from "@/lib/page-schema";

type LandingPagePreviewProps = {
  landingPage: LandingPage;
  brandName?: string;
};

export function LandingPagePreview({
  landingPage,
  brandName,
}: LandingPagePreviewProps) {
  const displayBrand =
    brandName ??
    landingPage.page.title ??
    landingPage.theme.preset
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.1)]">
      <div className="border-b border-slate-100 bg-white px-6 py-4 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <div className="text-lg font-bold tracking-tight text-violet-700">{displayBrand}</div>
            <div className="hidden items-center gap-5 text-sm text-slate-500 md:flex">
              <span>Home</span>
              <span>About Us</span>
              <span>Services</span>
              <span>Pages</span>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Get Started
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: landingPage.theme.backgroundColor,
          color: landingPage.theme.textColor,
        }}
      >
        <HeroSection
          description={landingPage.page.description}
          hero={landingPage.page.hero}
          theme={landingPage.theme}
          title={landingPage.page.title}
        />
        <SocialProofSection socialProof={landingPage.page.socialProof} />
        <FeaturesSection features={landingPage.page.features} />
        <HowItWorksSection howItWorks={landingPage.page.howItWorks} />
        <FaqSection faq={landingPage.page.faq} />
        <FinalCtaSection cta={landingPage.page.cta} theme={landingPage.theme} />
      </div>
    </article>
  );
}
