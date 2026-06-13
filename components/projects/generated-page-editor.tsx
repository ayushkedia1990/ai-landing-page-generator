"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

import {
  saveGeneratedPageEdits,
  type SaveGeneratedPageEditsState,
} from "@/app/project/[id]/actions";
import { ActionFeedback } from "@/components/projects/action-feedback";
import type { LandingPage } from "@/lib/page-schema";

type GeneratedPageEditorProps = {
  landingPage: LandingPage;
  projectId: string;
};

const initialState: SaveGeneratedPageEditsState = {};

const inputClassName =
  "mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10";

type TextFieldProps = {
  defaultValue: string;
  label: string;
  name: string;
};

function TextField({ defaultValue, label, name }: TextFieldProps) {
  return (
    <label className="block text-sm font-semibold text-foreground">
      {label}
      <input
        className={inputClassName}
        defaultValue={defaultValue}
        name={name}
        type="text"
      />
    </label>
  );
}

type TextAreaFieldProps = {
  defaultValue: string;
  label: string;
  name: string;
  rows?: number;
};

function TextAreaField({
  defaultValue,
  label,
  name,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <label className="block text-sm font-semibold text-foreground">
      {label}
      <textarea
        className={inputClassName}
        defaultValue={defaultValue}
        name={name}
        rows={rows}
      />
    </label>
  );
}

export function GeneratedPageEditor({
  landingPage,
  projectId,
}: GeneratedPageEditorProps) {
  const router = useRouter();
  const action = saveGeneratedPageEdits.bind(null, projectId);
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.saved) {
      router.refresh();
    }
  }, [router, state.saved]);

  return (
    <form
      action={formAction}
      aria-busy={pending}
      className="glass-panel space-y-8 rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.08)] sm:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Simple content editor
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            Edit the sections users care about most.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            These fields write back to the stored landing page JSON that powers the
            generated draft for this project.
          </p>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving edits..." : "Save generated edits"}
        </button>
      </div>

      {state.saved && state.message ? (
        <ActionFeedback tone="success" title="Edits saved">
          {state.message}
        </ActionFeedback>
      ) : null}

      {state.error ? (
        <ActionFeedback tone="error" title="Could not save edits">
          {state.error}
        </ActionFeedback>
      ) : null}

      {state.issues?.length ? (
        <div className="rounded-3xl border border-danger/20 bg-danger/8 px-4 py-4 text-sm text-danger">
          <p className="font-semibold">Validation issues</p>
          <div className="mt-2 space-y-1">
            {state.issues.map((issue) => (
              <p key={issue}>{issue}</p>
            ))}
          </div>
        </div>
      ) : null}

      <section className="space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Hero
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            defaultValue={landingPage.page.hero.headline}
            label="Headline"
            name="heroHeadline"
          />
          <TextAreaField
            defaultValue={landingPage.page.hero.subheadline}
            label="Subheadline"
            name="heroSubheadline"
            rows={5}
          />
          <TextField
            defaultValue={landingPage.page.hero.primaryCtaText}
            label="Primary CTA"
            name="heroPrimaryCtaText"
          />
          <TextField
            defaultValue={landingPage.page.hero.secondaryCtaText}
            label="Secondary CTA"
            name="heroSecondaryCtaText"
          />
        </div>
      </section>

      <section className="space-y-4 border-t border-border/80 pt-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Social proof labels
          </p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Keep one trust label per line.
          </p>
        </div>
        <TextAreaField
          defaultValue={landingPage.page.socialProof.logos.join("\n")}
          label="Labels"
          name="socialProofLogos"
          rows={5}
        />
      </section>

      <section className="space-y-5 border-t border-border/80 pt-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Feature items
          </p>
        </div>
        <div className="space-y-5">
          {landingPage.page.features.items.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="rounded-3xl border border-border/80 bg-card-strong p-5"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  defaultValue={item.title}
                  label={`Feature ${index + 1} title`}
                  name={`featureTitle-${index}`}
                />
                <TextAreaField
                  defaultValue={item.description}
                  label={`Feature ${index + 1} description`}
                  name={`featureDescription-${index}`}
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5 border-t border-border/80 pt-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            FAQ items
          </p>
        </div>
        <div className="space-y-5">
          {landingPage.page.faq.items.map((item, index) => (
            <div
              key={`${item.question}-${index}`}
              className="rounded-3xl border border-border/80 bg-card-strong p-5"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  defaultValue={item.question}
                  label={`FAQ ${index + 1} question`}
                  name={`faqQuestion-${index}`}
                />
                <TextAreaField
                  defaultValue={item.answer}
                  label={`FAQ ${index + 1} answer`}
                  name={`faqAnswer-${index}`}
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t border-border/80 pt-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Final CTA
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            defaultValue={landingPage.page.cta.headline}
            label="CTA headline"
            name="ctaHeadline"
          />
          <TextField
            defaultValue={landingPage.page.cta.buttonText}
            label="CTA button text"
            name="ctaButtonText"
          />
        </div>
      </section>
    </form>
  );
}