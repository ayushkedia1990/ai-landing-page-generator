export const stylePresetIds = [
  "modern-saas",
  "minimal-clean",
  "bold-startup",
  "premium-luxury",
  "glassomorphism",
  "bento-grid",
  "material-design",
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
    label: "Soft UI",
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
    label: "Editorial",
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
    label: "Neo-Brutalism",
    promptHint:
      "High-contrast visuals, energetic marketing language, and sharper calls to action.",
    theme: {
      primaryColor: "#ff5a1f",
      backgroundColor: "#fff2eb",
      textColor: "#1f2937",
    },
  },
  {
    id: "premium-luxury",
    label: "Premium Luxury",
    promptHint:
      "Elegant and sophisticated with premium messaging, exclusive language, and refined aesthetics.",
    theme: {
      primaryColor: "#8b5cf6",
      backgroundColor: "#faf5ff",
      textColor: "#3f0f5c",
    },
  },
  {
    id: "glassomorphism",
    label: "Glassomorphism",
    promptHint:
      "Modern frosted glass effect design with transparency, depth, and contemporary messaging.",
    theme: {
      primaryColor: "#06b6d4",
      backgroundColor: "#f0f9fc",
      textColor: "#0c4a6e",
    },
  },
  {
    id: "bento-grid",
    label: "Bento Grid",
    promptHint:
      "Modular grid-based layout with bold typography, varied section sizes, and energetic branding.",
    theme: {
      primaryColor: "#f59e0b",
      backgroundColor: "#fffbeb",
      textColor: "#78350f",
    },
  },
  {
    id: "material-design",
    label: "Material Design",
    promptHint:
      "Google Material Design principles with shadow depth, clean cards, and intuitive interactions.",
    theme: {
      primaryColor: "#3b82f6",
      backgroundColor: "#eff6ff",
      textColor: "#1e40af",
    },
  },
];