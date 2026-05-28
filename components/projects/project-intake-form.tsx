"use client";

import { useActionState } from "react";

import {
  saveProjectIntake,
  type SaveProjectIntakeState,
} from "@/app/project/[id]/actions";
import { ActionFeedback } from "@/components/projects/action-feedback";
import type { StylePreset } from "@/lib/style-presets";
import type { ProjectIntakeInput } from "@/lib/validations/project";

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