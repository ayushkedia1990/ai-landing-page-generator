import {
  buildLandingPageTheme,
  landingPageSchemaTemplate,
} from "@/lib/page-schema";
import type { StylePreset } from "@/lib/style-presets";
import type { ProjectIntakeInput } from "@/lib/validations/project";

type BuildLandingPagePromptInput = {
  preset: StylePreset;
  project: ProjectIntakeInput;
};

function formatList(label: string, items: string[]) {
  if (items.length === 0) {
    return `${label}: none provided`;
  }

  return `${label}:\n- ${items.join("\n- ")}`;
}

function formatSections(sections: string[]) {
  if (sections.length === 0) {
    return "Sections to include: hero only";
  }

  return `Sections to include: ${sections.join(", ")}`;
}

export function buildLandingPagePrompt({
  preset,
  project,
}: BuildLandingPagePromptInput) {
  const theme = buildLandingPageTheme(preset);

  const systemPrompt = [
    "You write concise, plausible landing page copy for startup products.",
    "Return only raw JSON.",
    "Do not wrap the response in markdown, code fences, or commentary.",
    "Keep the theme values exactly as provided.",
    "Use the fixed landing page schema exactly as shown below.",
    landingPageSchemaTemplate,
    "Rules:",
    "- Keep socialProof.logos to 3-6 short trust labels, not URLs.",
    "- Keep features.items to 3-6 items.",
    "- Keep howItWorks.steps to 3 items.",
    "- Keep faq.items to 3-6 items.",
    "- Use the provided primary CTA wording in the hero and final CTA.",
    "- Use concise marketing copy that still sounds specific and credible.",
    "- Do not add extra keys.",
  ].join("\n");

  const userPrompt = [
    `Style preset: ${preset.label}`,
    `Preset guidance: ${preset.promptHint}`,
    `Theme defaults: ${JSON.stringify(theme)}`,
    `Project name: ${project.projectName}`,
    `Product name: ${project.productName}`,
    `Brand name: ${project.brandName}`,
    `One-line description: ${project.oneLineDescription}`,
    `Target audience: ${project.targetAudience}`,
    `Primary CTA: ${project.primaryCta}`,
    `Main CTA goal: ${project.mainCtaGoal}`,
    `Conversion logic: ${project.conversionLogic}`,
    `Preferred font: ${project.font}`,
    `Tone: ${project.tone}`,
    formatList("Optional features to incorporate", project.features),
    formatList("Optional testimonials to incorporate", project.testimonials),
    formatList("Optional FAQs to incorporate", project.faqs),
    formatSections(project.sections),
  ].join("\n\n");

  return {
    systemPrompt,
    userPrompt,
  };
}