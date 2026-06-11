"use client";

import { useActionState } from "react";

import {
  saveProjectIntake,
  type SaveProjectIntakeState,
} from "@/app/project/[id]/actions";
import { ActionFeedback } from "@/components/projects/action-feedback";
import type { StylePreset } from "@/lib/style-presets";
import {
  conversionFrameworkOptions,
  ctaGoalOptions,
  fontFamilyOptions,
  includeSectionOptions,
  styleDirectionOptions,
  toneOfVoiceOptions,
  type ProjectIntakeInput,
} from "@/lib/validations/project";

type ProjectIntakeFormProps = {
  projectId: string;
  initialValues: ProjectIntakeInput;
  stylePresets: StylePreset[];
};

const initialState: SaveProjectIntakeState = {};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.[0]) {
    return null;
  }

  return <p className="mt-2 text-sm text-danger">{errors[0]}</p>;
}

const inputClassName =
  "mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10";

const ctaGoalLabels: Record<(typeof ctaGoalOptions)[number], string> = {
  "book-discovery-call": "Book Discovery Call",
  "purchase-now": "Purchase Now",
  "join-waitlist": "Join Waitlist",
  "download-free-guide": "Download Free Guide",
  "register-for-webinar": "Register for Webinar",
};

const styleDirectionLabels: Record<(typeof styleDirectionOptions)[number], string> = {
  editorial: "Editorial",
  "premium-luxury": "Premium Luxury",
  glassmorphism: "Glassmorphism",
  "soft-ui": "Soft UI",
  "bento-grid": "Bento Grid",
  "material-design": "Material Design",
  "neo-brutalism": "Neo-Brutalism",
};

const toneOfVoiceLabels: Record<(typeof toneOfVoiceOptions)[number], string> = {
  "professional-authoritative": "Professional & Authoritative",
  "friendly-conversational": "Friendly & Conversational",
  "luxury-exclusive": "Luxury & Exclusive",
  "energetic-motivational": "Energetic & Motivational",
  "calm-spiritual": "Calm & Spiritual",
};

const conversionFrameworkLabels: Record<
  (typeof conversionFrameworkOptions)[number],
  string
> = {
  aida: "AIDA",
  d2c: "D2C",
  bab: "BAB",
  pas: "PAS",
  fab: "FAB",
  storybrand: "StoryBrand",
};

const includeSectionLabels: Record<(typeof includeSectionOptions)[number], string> = {
  hero: "Hero Section",
  "social-proof-trust-bar": "Social Proof / Trust Bar",
  problem: "Problem Section",
  features: "Features Section",
  "how-it-works": "How It Works",
  "visual-demo": "Visual Demo",
  "transformation-benefits": "Transformation / Benefits",
  "testimonials-case-studies": "Testimonials / Case Studies",
  comparison: "Comparison Section",
  pricing: "Pricing Section",
  faq: "FAQ Section",
  "final-cta": "Final CTA Section",
  "lead-magnet": "Lead Magnet Section",
  backstory: "Backstory",
  calendar: "Calendar",
};

export function ProjectIntakeForm({
  projectId,
  initialValues,
  stylePresets,
}: ProjectIntakeFormProps) {
  const saveAction = saveProjectIntake.bind(null, projectId);
  const [state, formAction, pending] = useActionState(saveAction, initialState);

  return (
    <form
      action={formAction}
      aria-busy={pending}
      className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.08)] sm:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Guided intake
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Capture the fixed MVP inputs.
          </h2>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[0_16px_40px_rgba(23,105,255,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving brief..." : "Save intake"}
        </button>
      </div>

      {state.saved && state.message ? (
        <div className="mt-5">
          <ActionFeedback tone="success" title="Intake saved">
            {state.message}
          </ActionFeedback>
        </div>
      ) : null}

      {state.error ? (
        <div className="mt-5">
          <ActionFeedback tone="error" title="Could not save intake">
            {state.error}
          </ActionFeedback>
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="projectName" className="text-sm font-semibold text-foreground">
            Project name
          </label>
          <input
            id="projectName"
            name="projectName"
            type="text"
            required
            defaultValue={initialValues.projectName}
            className={inputClassName}
          />
          <FieldError errors={state.errors?.projectName} />
        </div>

        <div>
          <label htmlFor="productName" className="text-sm font-semibold text-foreground">
            Product name
          </label>
          <input
            id="productName"
            name="productName"
            type="text"
            required
            defaultValue={initialValues.productName}
            className={inputClassName}
          />
          <FieldError errors={state.errors?.productName} />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="oneLineDescription"
            className="text-sm font-semibold text-foreground"
          >
            One-line description
          </label>
          <textarea
            id="oneLineDescription"
            name="oneLineDescription"
            required
            rows={3}
            defaultValue={initialValues.oneLineDescription}
            className={inputClassName}
          />
          <FieldError errors={state.errors?.oneLineDescription} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="outcomePromise" className="text-sm font-semibold text-foreground">
            What outcome do you promise?
          </label>
          <textarea
            id="outcomePromise"
            name="outcomePromise"
            required
            rows={3}
            defaultValue={initialValues.outcomePromise}
            className={inputClassName}
          />
          <FieldError errors={state.errors?.outcomePromise} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="uniqueAdvantage" className="text-sm font-semibold text-foreground">
            What is your unique advantage?
          </label>
          <textarea
            id="uniqueAdvantage"
            name="uniqueAdvantage"
            required
            rows={3}
            defaultValue={initialValues.uniqueAdvantage}
            className={inputClassName}
          />
          <FieldError errors={state.errors?.uniqueAdvantage} />
        </div>

        <div>
          <label htmlFor="targetAudience" className="text-sm font-semibold text-foreground">
            Target audience
          </label>
          <input
            id="targetAudience"
            name="targetAudience"
            type="text"
            required
            defaultValue={initialValues.targetAudience}
            className={inputClassName}
          />
          <FieldError errors={state.errors?.targetAudience} />
        </div>

        <div>
          <label htmlFor="primaryCta" className="text-sm font-semibold text-foreground">
            Primary CTA
          </label>
          <input
            id="primaryCta"
            name="primaryCta"
            type="text"
            required
            defaultValue={initialValues.primaryCta}
            className={inputClassName}
          />
          <FieldError errors={state.errors?.primaryCta} />
        </div>

        <div>
          <label htmlFor="ctaGoal" className="text-sm font-semibold text-foreground">
            Main CTA goal
          </label>
          <select
            id="ctaGoal"
            name="ctaGoal"
            defaultValue={initialValues.ctaGoal}
            className={inputClassName}
          >
            {ctaGoalOptions.map((option) => (
              <option key={option} value={option}>
                {ctaGoalLabels[option]}
              </option>
            ))}
          </select>
          <FieldError errors={state.errors?.ctaGoal} />
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-semibold text-foreground">Conversion logic</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {conversionFrameworkOptions.map((option) => (
              <label
                key={option}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em]"
              >
                <input
                  type="checkbox"
                  name="conversionFrameworks"
                  value={option}
                  defaultChecked={initialValues.conversionFrameworks.includes(option)}
                />
                {conversionFrameworkLabels[option]}
              </label>
            ))}
          </div>
          <FieldError errors={state.errors?.conversionFrameworks} />
        </div>

        <div>
          <label htmlFor="tone" className="text-sm font-semibold text-foreground">
            Tone
          </label>
          <input
            id="tone"
            name="tone"
            type="text"
            required
            defaultValue={initialValues.tone}
            placeholder="Clear, confident, practical"
            className={inputClassName}
          />
          <FieldError errors={state.errors?.tone} />
        </div>

        <div>
          <label htmlFor="toneOfVoice" className="text-sm font-semibold text-foreground">
            Tone of voice
          </label>
          <select
            id="toneOfVoice"
            name="toneOfVoice"
            defaultValue={initialValues.toneOfVoice}
            className={inputClassName}
          >
            {toneOfVoiceOptions.map((option) => (
              <option key={option} value={option}>
                {toneOfVoiceLabels[option]}
              </option>
            ))}
          </select>
          <FieldError errors={state.errors?.toneOfVoice} />
        </div>

        <div>
          <label htmlFor="styleDirection" className="text-sm font-semibold text-foreground">
            Advanced style direction
          </label>
          <select
            id="styleDirection"
            name="styleDirection"
            defaultValue={initialValues.styleDirection}
            className={inputClassName}
          >
            {styleDirectionOptions.map((option) => (
              <option key={option} value={option}>
                {styleDirectionLabels[option]}
              </option>
            ))}
          </select>
          <FieldError errors={state.errors?.styleDirection} />
        </div>

        <div>
          <label htmlFor="brandName" className="text-sm font-semibold text-foreground">
            Product / brand name
          </label>
          <input
            id="brandName"
            name="brandName"
            type="text"
            required
            defaultValue={initialValues.brandName}
            className={inputClassName}
          />
          <FieldError errors={state.errors?.brandName} />
        </div>

        <div>
          <label htmlFor="fontFamily" className="text-sm font-semibold text-foreground">
            Font family
          </label>
          <select
            id="fontFamily"
            name="fontFamily"
            defaultValue={initialValues.fontFamily}
            className={inputClassName}
          >
            {fontFamilyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError errors={state.errors?.fontFamily} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="logoUrl" className="text-sm font-semibold text-foreground">
            Logo URL (optional)
          </label>
          <input
            id="logoUrl"
            name="logoUrl"
            type="text"
            defaultValue={initialValues.logoUrl}
            placeholder="https://example.com/logo.png"
            className={inputClassName}
          />
          <FieldError errors={state.errors?.logoUrl} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="brandColors" className="text-sm font-semibold text-foreground">
            Brand colors
          </label>
          <textarea
            id="brandColors"
            name="brandColors"
            rows={4}
            defaultValue={initialValues.brandColors.join("\n")}
            placeholder="#2563eb\n#93c5fd\n#0f172a"
            className={inputClassName}
          />
          <p className="mt-2 text-xs text-muted-foreground">Use one hex color per line.</p>
          <FieldError errors={state.errors?.brandColors} />
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-semibold text-foreground">Include sections</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {includeSectionOptions.map((option) => (
              <label key={option} className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="includeSections"
                  value={option}
                  defaultChecked={initialValues.includeSections.includes(option)}
                />
                {includeSectionLabels[option]}
              </label>
            ))}
          </div>
          <FieldError errors={state.errors?.includeSections} />
        </div>

        <div>
          <label htmlFor="stylePreset" className="text-sm font-semibold text-foreground">
            Style preset
          </label>
          <select
            id="stylePreset"
            name="stylePreset"
            defaultValue={initialValues.stylePreset}
            className={inputClassName}
          >
            {stylePresets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
          </select>
          <FieldError errors={state.errors?.stylePreset} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="features" className="text-sm font-semibold text-foreground">
            Optional features list
          </label>
          <textarea
            id="features"
            name="features"
            rows={5}
            defaultValue={initialValues.features.join("\n")}
            placeholder="One feature per line"
            className={inputClassName}
          />
          <FieldError errors={state.errors?.features} />
        </div>

        <div>
          <label htmlFor="testimonials" className="text-sm font-semibold text-foreground">
            Optional testimonials
          </label>
          <textarea
            id="testimonials"
            name="testimonials"
            rows={5}
            defaultValue={initialValues.testimonials.join("\n")}
            placeholder="One testimonial per line"
            className={inputClassName}
          />
          <FieldError errors={state.errors?.testimonials} />
        </div>

        <div>
          <label htmlFor="faqs" className="text-sm font-semibold text-foreground">
            Optional FAQs
          </label>
          <textarea
            id="faqs"
            name="faqs"
            rows={5}
            defaultValue={initialValues.faqs.join("\n")}
            placeholder="One FAQ idea per line"
            className={inputClassName}
          />
          <FieldError errors={state.errors?.faqs} />
        </div>
      </div>
    </form>
  );
}