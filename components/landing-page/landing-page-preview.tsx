import { FaqSection } from "@/components/landing-page/faq-section";
import { FeaturesSection } from "@/components/landing-page/features-section";
import { FinalCtaSection } from "@/components/landing-page/final-cta-section";
import { HeroSection } from "@/components/landing-page/hero-section";
import { HowItWorksSection } from "@/components/landing-page/how-it-works-section";
import { SocialProofSection } from "@/components/landing-page/social-proof-section";
import type { LandingPage } from "@/lib/page-schema";

type LandingPagePreviewProps = {
  landingPage: LandingPage;
};

export function LandingPagePreview({
  landingPage,
}: LandingPagePreviewProps) {
  return (
    <article className="overflow-hidden rounded-4xl border border-border/80 bg-card-strong shadow-[0_20px_60px_rgba(16,19,35,0.1)]">
      <div
        className="border-b border-black/5 px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] text-black/55 sm:px-10"
        style={{
          backgroundColor: landingPage.theme.backgroundColor,
          color: landingPage.theme.textColor,
        }}
      >
        Preview • {landingPage.theme.preset}
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