"use client";

import { useActionState } from "react";

import {
  generateProjectPage,
  type GenerateProjectPageState,
} from "@/app/project/[id]/actions";

type GeneratePageCardProps = {
  projectId: string;
  canGenerate: boolean;
};

const initialState: GenerateProjectPageState = {};

export function GeneratePageCard({
  projectId,
  canGenerate,
}: GeneratePageCardProps) {
  const action = generateProjectPage.bind(null, projectId);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <section className="glass-panel rounded-4xl border border-border/80 p-6 shadow-[0_18px_50px_rgba(16,19,35,0.08)]">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Generate
      </p>
      <h2 className="mt-3 text-2xl font-semibold">Create the first landing page draft.</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        This action sends the saved intake form to OpenAI and validates the response
        against the fixed landing page schema before saving it.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <button
          type="submit"
          disabled={pending || !canGenerate}
          className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[0_16px_40px_rgba(23,105,255,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Generating landing page..." : "Generate landing page"}
        </button>

        {!canGenerate ? (
          <p className="text-sm text-muted-foreground">
            Save a complete intake form first. Generation only uses stored project data.
          </p>
        ) : null}

        {state.message ? (
          <p className="text-sm text-success">{state.message}</p>
        ) : null}

        {state.error ? <p className="text-sm text-danger">{state.error}</p> : null}
      </form>
    </section>
  );
}