import type { LandingPageFaq } from "@/lib/page-schema";

type FaqSectionProps = {
  faq: LandingPageFaq;
};

export function FaqSection({ faq }: FaqSectionProps) {
  return (
    <section className="border-b border-black/5 px-6 py-10 sm:px-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">{faq.headline}</h2>
        <div className="space-y-3">
          {faq.items.map((item) => (
            <details
              key={item.question}
              className="rounded-3xl border border-black/8 bg-white/75 px-5 py-4 shadow-[0_12px_30px_rgba(16,19,35,0.04)]"
            >
              <summary className="cursor-pointer list-none text-base font-semibold tracking-tight">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-black/65">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}