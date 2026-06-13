"use client";

import { useEffect, useMemo, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

import {
  saveProjectIntake,
  type SaveProjectIntakeState,
} from "@/app/project/[id]/actions";
import { ActionFeedback } from "@/components/projects/action-feedback";
import { CharacterCountField } from "@/components/ui/character-count-field";
import { SearchableSelect } from "@/components/ui/searchable-select";
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

  return <p className="mt-2 text-sm text-red-600">{errors[0]}</p>;
}

const conversionLogicOptions = [
  ["AIDA", "AIDA"],
  ["D2C", "D2C"],
  ["BAB", "BAB"],
  ["PAS", "PAS"],
  ["FAB", "FAB"],
  ["STORYBRAND", "StoryBrand"],
] as const;

const mainCtaGoalOptions = [
  { value: "book-discovery", label: "Book a Discovery Call" },
  { value: "purchase-now", label: "Purchase Now" },
  { value: "join-waitlist", label: "Join Waitlist" },
  { value: "download-free-guide", label: "Download Free Guide" },
  { value: "register-webinar", label: "Register for Webinar" },
] as const;

const toneOptions = [
  { value: "Professional Authoritative", label: "Professional Authoritative" },
  { value: "Friendly & Conversational", label: "Friendly & Conversational" },
  { value: "Luxury & Exclusive", label: "Luxury & Exclusive" },
  { value: "Energetic & Motivational", label: "Energetic & Motivational" },
  { value: "Calm & Spiritual", label: "Calm & Spiritual" },
] as const;

const sectionOptions = [
  ["hero", "Hero Section"],
  ["socialProof", "Social Proof / Trust Bar"],
  ["problem", "Problem Section"],
  ["features", "Features Section"],
  ["howItWorks", "How It Works"],
  ["visualDemo", "Visual Demo"],
  ["transformation", "Transformation / Benefits"],
  ["testimonials", "Testimonials / Case Studies"],
  ["comparison", "Comparison Section"],
  ["pricing", "Pricing Section"],
  ["faq", "FAQ Section"],
  ["finalCta", "Final CTA Section"],
] as const;

function StepBadge({ step }: { step: number }) {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
      {step}
    </div>
  );
}

export function ProjectIntakeForm({
  projectId,
  initialValues,
  stylePresets,
}: ProjectIntakeFormProps) {
  const router = useRouter();
  const saveAction = saveProjectIntake.bind(null, projectId);
  const [state, formAction, pending] = useActionState(saveAction, initialState);
  const [selectedPreset, setSelectedPreset] = useState(initialValues.stylePreset);
  const [conversionLogic, setConversionLogic] = useState(initialValues.conversionLogic);
  const [primaryColor, setPrimaryColor] = useState(initialValues.brandColors?.primaryColor || "");
  const [backgroundColor, setBackgroundColor] = useState(initialValues.brandColors?.backgroundColor || "");
  const [textColor, setTextColor] = useState(initialValues.brandColors?.textColor || "");
  const [extraColors, setExtraColors] = useState<string[]>(initialValues.brandColors?.extraColors || []);
  const activePreset = useMemo(
    () => stylePresets.find((preset) => preset.id === selectedPreset) ?? stylePresets[0],
    [selectedPreset, stylePresets],
  );

  useEffect(() => {
    if (state.saved) {
      router.refresh();
    }
  }, [router, state.saved]);



  return (
    <form action={formAction} aria-busy={pending} className="space-y-5">
      {state.saved && state.message ? (
        <ActionFeedback tone="success" title="Intake saved">
          {state.message}
        </ActionFeedback>
      ) : null}

      {state.error ? (
        <ActionFeedback tone="error" title="Could not save intake">
          {state.error}
        </ActionFeedback>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <StepBadge step={1} />
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-slate-900">Describe Your Offer</p>
            <p className="mt-1 text-sm text-slate-500">
              Help us understand your product or service
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <input type="hidden" name="projectName" value={initialValues.projectName} />
          <input type="hidden" name="brandColors.primaryColor" value={primaryColor || activePreset.theme.primaryColor} />
          <input type="hidden" name="brandColors.backgroundColor" value={backgroundColor || activePreset.theme.backgroundColor} />
          <input type="hidden" name="brandColors.textColor" value={textColor || activePreset.theme.textColor} />

          <CharacterCountField
            id="productName"
            name="productName"
            label="What are you selling?"
            defaultValue={initialValues.productName}
            maxLength={120}
            required
          />
          <FieldError errors={state.errors?.productName} />

          <CharacterCountField
            id="targetAudience"
            name="targetAudience"
            label="Who is your target audience?"
            defaultValue={initialValues.targetAudience}
            maxLength={80}
            required
          />
          <FieldError errors={state.errors?.targetAudience} />

          <CharacterCountField
            id="oneLineDescription"
            name="oneLineDescription"
            label="What outcome do you promise?"
            defaultValue={initialValues.oneLineDescription}
            maxLength={120}
            required
            multiline
            rows={3}
          />
          <FieldError errors={state.errors?.oneLineDescription} />

          <CharacterCountField
            id="primaryCta"
            name="primaryCta"
            label="What's your unique advantage?"
            defaultValue={initialValues.primaryCta}
            maxLength={120}
            required
            multiline
            rows={3}
          />
          <FieldError errors={state.errors?.primaryCta} />

          <SearchableSelect
            name="mainCtaGoal"
            label="Main CTA Goal"
            options={[...mainCtaGoalOptions]}
            defaultValue={initialValues.mainCtaGoal}
            placeholder="Select Goal"
            required
          />
          <FieldError errors={state.errors?.mainCtaGoal} />

          <div>
            <p className="text-sm font-medium text-slate-700">Select Conversion Logic</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {conversionLogicOptions.map(([value, label]) => {
                const selected = conversionLogic === value;

                return (
                  <label
                    key={value}
                    className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${selected
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="conversionLogic"
                      value={value}
                      checked={selected}
                      onChange={() => setConversionLogic(value)}
                      className="sr-only"
                    />
                    {selected ? (
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : null}
                    {label}
                  </label>
                );
              })}
            </div>
            <FieldError errors={state.errors?.conversionLogic} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <StepBadge step={2} />
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-slate-900">Branding Identity</p>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <p className="text-sm font-medium text-slate-700">Advance Style</p>
            <input type="hidden" name="stylePreset" value={selectedPreset} />
            <div className="mt-2 flex flex-wrap gap-2">
              {stylePresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(preset.id);
                    setPrimaryColor(preset.theme.primaryColor);
                    setBackgroundColor(preset.theme.backgroundColor);
                    setTextColor(preset.theme.textColor);
                  }}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${selectedPreset === preset.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">Brand Colors</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <label className="cursor-pointer">
                <div
                  className="h-9 w-9 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition"
                  style={{ backgroundColor: primaryColor || activePreset.theme.primaryColor }}
                />
                <input
                  type="color"
                  value={primaryColor || activePreset.theme.primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="sr-only"
                  name="brandColors.primaryColor"
                />
              </label>
              <label className="cursor-pointer">
                <div
                  className="h-9 w-9 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition"
                  style={{ backgroundColor: backgroundColor || activePreset.theme.backgroundColor }}
                />
                <input
                  type="color"
                  value={backgroundColor || activePreset.theme.backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="sr-only"
                  name="brandColors.backgroundColor"
                />
              </label>
              <label className="cursor-pointer">
                <div
                  className="h-9 w-9 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition"
                  style={{ backgroundColor: textColor || activePreset.theme.textColor }}
                />
                <input
                  type="color"
                  value={textColor || activePreset.theme.textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="sr-only"
                  name="brandColors.textColor"
                />
              </label>
              {extraColors.map((color, index) => (
                <div key={index} className="relative">
                  <label className="cursor-pointer">
                    <div
                      className="h-9 w-9 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition"
                      style={{ backgroundColor: color }}
                    />
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...extraColors];
                        newColors[index] = e.target.value;
                        setExtraColors(newColors);
                      }}
                      className="sr-only"
                    />
                    <input type="hidden" name={`brandColors.extraColors.${index}`} value={color} />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const newColors = extraColors.filter((_, i) => i !== index);
                      setExtraColors(newColors);
                    }}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setExtraColors([...extraColors, "#ffffff"])}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:border-blue-300 hover:text-blue-500 transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <CharacterCountField
            id="brandName"
            name="brandName"
            label="Your Product / Brand Name"
            defaultValue={initialValues.brandName}
            maxLength={80}
            required
          />
          <FieldError errors={state.errors?.brandName} />

          <SearchableSelect
            name="tone"
            label="Tone of Voice"
            options={[...toneOptions]}
            defaultValue={initialValues.tone}
            placeholder="Select a Tone"
            required
          />
          <FieldError errors={state.errors?.tone} />

          <SearchableSelect
            name="font"
            label="Select a Font"
            options={[
              { value: "Inter", label: "Inter" },
              { value: "Roboto", label: "Roboto" },
              { value: "Open Sans", label: "Open Sans" },
              { value: "Poppins", label: "Poppins" },
              { value: "Playfair Display", label: "Playfair Display" },
              { value: "Lato", label: "Lato" },
              { value: "Montserrat", label: "Montserrat" },
              { value: "IBM Plex Sans", label: "IBM Plex Sans" },
              { value: "Raleway", label: "Raleway" },
              { value: "Source Sans Pro", label: "Source Sans Pro" },
              { value: "Ubuntu", label: "Ubuntu" },
              { value: "Outfit", label: "Outfit" },
              { value: "DM Sans", label: "DM Sans" },
              { value: "Manrope", label: "Manrope" },
              { value: "Segoe UI Symbol", label: "Segoe UI Symbol" },
              { value: "Noto Sans", label: "Noto Sans" },
            ]}
            defaultValue={initialValues.font}
            placeholder="Select a Font"
            required
            fontPreview
          />
          <FieldError errors={state.errors?.font} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <StepBadge step={3} />
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-slate-900">Sections</p>
            <p className="mt-1 text-sm text-slate-500">
              Pick the page sections you want the AI to include.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          {sectionOptions.map(([value, label]) => (
            <label
              key={value}
              className="inline-flex w-full cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-slate-900 transition hover:border-blue-300"
            >
              <input
                type="checkbox"
                name="sections"
                value={value}
                defaultChecked={initialValues.sections.includes(value)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.25)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving intake..." : "Save intake"}
      </button>
    </form>
  );
}
