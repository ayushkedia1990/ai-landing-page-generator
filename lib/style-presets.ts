export const stylePresetIds = [
  "modern-saas",
  "minimal-clean",
  "bold-startup",
] as const;

export type StylePresetId = (typeof stylePresetIds)[number];

export type StylePreset = {
  id: StylePresetId;
  label: string;
  promptHint: string;
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
};

export const defaultStylePreset: StylePresetId = "modern-saas";

export function isStylePresetId(value: string): value is StylePresetId {
  return stylePresetIds.includes(value as StylePresetId);
}

export function resolveStylePresetId(value: string | null | undefined): StylePresetId {
  if (value && isStylePresetId(value)) {
    return value;
  }

  return defaultStylePreset;
}

export function getStylePreset(id: StylePresetId) {
  const preset = stylePresets.find((entry) => entry.id === id);

  return preset ?? stylePresets[0];
}

export const stylePresets: StylePreset[] = [
  {
    id: "modern-saas",
    label: "Modern SaaS",
    promptHint:
      "Clean product-led copy with soft contrast, confident messaging, and a focused conversion path.",
    theme: {
      primaryColor: "#1769ff",
      backgroundColor: "#f6f9ff",
      textColor: "#101323",
    },
  },
  {
    id: "minimal-clean",
    label: "Minimal Clean",
    promptHint:
      "Whitespace-heavy, restrained hierarchy with concise copy and an editorial feel.",
    theme: {
      primaryColor: "#0f172a",
      backgroundColor: "#f8f7f2",
      textColor: "#111827",
    },
  },
  {
    id: "bold-startup",
    label: "Bold Startup",
    promptHint:
      "High-contrast visuals, energetic marketing language, and sharper calls to action.",
    theme: {
      primaryColor: "#ff5a1f",
      backgroundColor: "#fff2eb",
      textColor: "#1f2937",
    },
  },
];