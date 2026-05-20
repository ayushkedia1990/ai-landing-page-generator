import { buildLandingPagePrompt } from "@/lib/landing-page-prompt";
import { landingPageSchema, type LandingPage } from "@/lib/page-schema";
import type { StylePreset } from "@/lib/style-presets";
import type { ProjectIntakeInput } from "@/lib/validations/project";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

type GenerateLandingPageInput = {
  preset: StylePreset;
  project: ProjectIntakeInput;
};

type OpenAIResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
};

export async function generateLandingPage({
  preset,
  project,
}: GenerateLandingPageInput): Promise<LandingPage> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY. Add it to your environment before generating.");
  }

  const { systemPrompt, userPrompt } = buildLandingPagePrompt({
    preset,
    project,
  });

  let repairHint = "";

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const content = await requestChatCompletion({
      apiKey,
      model: DEFAULT_OPENAI_MODEL,
      repairHint,
      systemPrompt,
      userPrompt,
    });

    const parsedJson = parseModelJson(content);
    const validatedPage = landingPageSchema.safeParse(parsedJson);

    if (validatedPage.success) {
      return validatedPage.data;
    }

    repairHint = validatedPage.error.issues
      .slice(0, 5)
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");
  }

  throw new Error(
    repairHint
      ? `OpenAI returned JSON that still failed validation: ${repairHint}`
      : "OpenAI did not return a valid landing page payload.",
  );
}

async function requestChatCompletion({
  apiKey,
  model,
  repairHint,
  systemPrompt,
  userPrompt,
}: {
  apiKey: string;
  model: string;
  repairHint: string;
  systemPrompt: string;
  userPrompt: string;
}) {
  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: repairHint
            ? `${userPrompt}\n\nPrevious validation issues to fix: ${repairHint}\nReturn corrected JSON only.`
            : userPrompt,
        },
      ],
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as OpenAIResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message ?? "OpenAI request failed.");
  }

  const content = payload.choices?.[0]?.message?.content;

  if (typeof content !== "string" || content.trim().length === 0) {
    throw new Error("OpenAI returned an empty response.");
  }

  return content;
}

function parseModelJson(content: string) {
  const cleanedContent = stripCodeFences(content);

  try {
    return JSON.parse(cleanedContent);
  } catch {
    throw new Error("OpenAI did not return valid JSON.");
  }
}

function stripCodeFences(value: string) {
  return value
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}