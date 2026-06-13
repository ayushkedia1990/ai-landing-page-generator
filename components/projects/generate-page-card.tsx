"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

import {
  generateProjectPage,
  type GenerateProjectPageState,
} from "@/app/project/[id]/actions";
import { ActionFeedback } from "@/components/projects/action-feedback";

type GeneratePageCardProps = {
  projectId: string;
  canGenerate: boolean;
};

const initialState: GenerateProjectPageState = {};

export function GeneratePageCard({
  projectId,
  canGenerate,
}: GeneratePageCardProps) {
  const router = useRouter();
  const action = generateProjectPage.bind(null, projectId);
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.generated) {
      router.refresh();
    }
  }, [router, state.generated]);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.1)]">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
        Generate
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
        Create the first landing page draft.
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        Send the saved intake to the backend LLM and save the generated preview in your project.
      </p>

      <form action={formAction} aria-busy={pending} className="mt-6 space-y-4">
        <button
          type="submit"
          disabled={pending || !canGenerate}
          className="w-full rounded-full bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(79,70,229,0.24)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Generating landing page..." : "Generate landing page"}
        </button>

        {!canGenerate ? (
          <ActionFeedback tone="neutral" title="Generation locked">
            Save a complete intake form first. Generation only uses stored project data.
          </ActionFeedback>
        ) : null}

        {state.generated && state.message ? (
          <ActionFeedback tone="success" title="Draft ready">
            {state.message}
          </ActionFeedback>
        ) : null}

        {state.error ? (
          <ActionFeedback tone="error" title="Generation failed">
            {state.error}
          </ActionFeedback>
        ) : null}
      </form>
    </section>
  );
}
