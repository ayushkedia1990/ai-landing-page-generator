"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

import {
  generateProjectPage,
  type GenerateProjectPageState,
} from "@/app/project/[id]/actions";
import { LandingPagePreview } from "@/components/landing-page/landing-page-preview";
import { ActionFeedback } from "@/components/projects/action-feedback";
import type { LandingPage } from "@/lib/page-schema";

type ProjectPreviewPanelProps = {
  projectId: string;
  canGenerate: boolean;
  landingPage: LandingPage | null;
  brandName: string;
};

const initialState: GenerateProjectPageState = {};

type DevicePreview = "desktop" | "tablet" | "mobile";

export function ProjectPreviewPanel({
  projectId,
  canGenerate,
  landingPage,
  brandName,
}: ProjectPreviewPanelProps) {
  const router = useRouter();
  const action = generateProjectPage.bind(null, projectId);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [device, setDevice] = useState<DevicePreview>("desktop");
  const hasGeneratedPage = Boolean(landingPage);

  useEffect(() => {
    if (state.generated) {
      router.refresh();
    }
  }, [router, state.generated]);

  const previewWidthClass =
    device === "mobile"
      ? "max-w-[390px]"
      : device === "tablet"
        ? "max-w-[768px]"
        : "max-w-full";

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          {(["desktop", "tablet", "mobile"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={device === option}
              onClick={() => setDevice(option)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                device === option
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }`}
              title={`${option} preview`}
            >
              {option === "desktop" ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M8 20h8" />
                </svg>
              ) : option === "tablet" ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="8" y="2" width="8" height="20" rx="2" />
                </svg>
              )}
            </button>
          ))}
        </div>

        <p className="text-center text-sm font-medium text-slate-700">
          {hasGeneratedPage ? "Your Landing Page is Ready" : "Preview your landing page"}
        </p>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <form action={formAction}>
            <button
              type="submit"
              disabled={pending || !canGenerate}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending
                ? "Generating..."
                : hasGeneratedPage
                  ? "Regenerate"
                  : "Generate"}
            </button>
          </form>
          <button
            type="button"
            disabled={!hasGeneratedPage}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Actions
          </button>
          <button
            type="button"
            disabled={!hasGeneratedPage}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Export
          </button>
        </div>
      </div>

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

      <div className={`mx-auto w-full transition-all duration-300 ${previewWidthClass}`}>
        {landingPage ? (
          <LandingPagePreview landingPage={landingPage} brandName={brandName} />
        ) : (
          <div className="flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-950">
              Your preview will appear here
            </p>
            <p className="mt-2 max-w-md text-sm leading-7 text-slate-600">
              Save the intake form, then click Generate to render your landing page draft.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
