import { buildLandingPagePrompt } from "@/lib/landing-page-prompt";
import { landingPageSchema, type LandingPage } from "@/lib/page-schema";
import type { StylePreset } from "@/lib/style-presets";
import type { ProjectIntakeInput } from "@/lib/validations/project";

const DEFAULT_OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_OPENAI_MODEL = "gpt-4.1-mini";
const DEFAULT_OPENROUTER_MODEL = "openrouter/free";
const DEFAULT_OPENROUTER_APP_NAME = "AI Landing Page Generator";

type GenerateLandingPageInput = {
  preset: StylePreset;
  project: ProjectIntakeInput;
};

type LlmProviderConfig = {
  model: string;
  requestHeaders: Record<string, string>;
  requestUrl: string;
  useJsonResponseFormat: boolean;
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
  const providerConfig = getLlmProviderConfig();

  const { systemPrompt, userPrompt } = buildLandingPagePrompt({
    preset,
    project,
  });

  let repairHint = "";

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const content = await requestChatCompletion({
      ...providerConfig,
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
      ? `The AI provider returned JSON that still failed validation: ${repairHint}`
      : "The AI provider did not return a valid landing page payload.",
  );
}

async function requestChatCompletion({
  model,
  repairHint,
  requestHeaders,
  requestUrl,
  systemPrompt,
  userPrompt,
  useJsonResponseFormat,
}: {
  model: string;
  repairHint: string;
  requestHeaders: Record<string, string>;
  requestUrl: string;
  systemPrompt: string;
  userPrompt: string;
  useJsonResponseFormat: boolean;
}) {
  const requestBody: Record<string, unknown> = {
    model,
    temperature: 0.7,
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
  };

  if (useJsonResponseFormat) {
    requestBody.response_format = {
      type: "json_object",
    };
  }

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestBody),
    cache: "no-store",
  });

  const payload = (await response.json()) as OpenAIResponse;

  if (!response.ok) {
    throw new Error(formatProviderError(payload.error?.message, requestUrl));
  }

  const content = payload.choices?.[0]?.message?.content;

  if (typeof content !== "string" || content.trim().length === 0) {
    throw new Error("The AI provider returned an empty response.");
  }

  return content;
}

function parseModelJson(content: string) {
  const cleanedContent = stripCodeFences(content);

  try {
    return JSON.parse(cleanedContent);
  } catch {
    throw new Error("The AI provider did not return valid JSON.");
  }
}

function stripCodeFences(value: string) {
  return value
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

function formatProviderError(message: string | undefined, requestUrl: string) {
  const normalizedMessage = message?.trim();

  if (!normalizedMessage) {
    return requestUrl.includes("openrouter.ai")
      ? "OpenRouter request failed. Check your API key and model slug in the root .env file."
      : "OpenAI request failed. Check your API key in the root .env file.";
  }

  if (
    requestUrl.includes("openrouter.ai") &&
    /user not found|unauthorized|invalid api key|authentication/i.test(normalizedMessage)
  ) {
    return "OpenRouter authentication failed. Check OPENROUTER_API_KEY in the root .env file and remove any accidental extra quotes.";
  }

  if (
    requestUrl.includes("openrouter.ai") &&
    /no endpoints found for/i.test(normalizedMessage)
  ) {
    return "OpenRouter could not route the selected model. Set OPENAI_MODEL to openrouter/free or another current OpenRouter slug in the root .env file, then restart the dev server.";
  }

  return normalizedMessage;
}

function getLlmProviderConfig(): LlmProviderConfig {
  const openRouterApiKey = readEnvValue("OPENROUTER_API_KEY");
  const openAiApiKey = readEnvValue("OPENAI_API_KEY");
  const apiKey = openRouterApiKey || openAiApiKey;

  if (!apiKey) {
    throw new Error(
      "Missing OPENAI_API_KEY or OPENROUTER_API_KEY. Add one to the root .env before generating.",
    );
  }

  const configuredBaseUrl = readEnvValue("OPENAI_BASE_URL");
  const requestUrl = resolveChatCompletionsUrl(
    configuredBaseUrl || (openRouterApiKey ? DEFAULT_OPENROUTER_URL : DEFAULT_OPENAI_URL),
  );
  const isOpenRouter = requestUrl.includes("openrouter.ai") || Boolean(openRouterApiKey);

  const requestHeaders: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  if (isOpenRouter) {
    const siteUrl =
      readEnvValue("OPENROUTER_SITE_URL") || readEnvValue("NEXT_PUBLIC_APP_URL");
    const appName =
      readEnvValue("OPENROUTER_APP_NAME") || DEFAULT_OPENROUTER_APP_NAME;

    if (siteUrl) {
      requestHeaders["HTTP-Referer"] = siteUrl;
    }

    if (appName) {
      requestHeaders["X-OpenRouter-Title"] = appName;
    }
  }

  return {
    model:
      readEnvValue("OPENAI_MODEL") ||
      (isOpenRouter ? DEFAULT_OPENROUTER_MODEL : DEFAULT_OPENAI_MODEL),
    requestHeaders,
    requestUrl,
    useJsonResponseFormat: shouldUseJsonResponseFormat(isOpenRouter),
  };
}

function resolveChatCompletionsUrl(value: string) {
  const normalized = value.replace(/\/+$/, "");

  if (normalized.endsWith("/chat/completions")) {
    return normalized;
  }

  if (normalized.endsWith("/api/v1") || normalized.endsWith("/v1")) {
    return `${normalized}/chat/completions`;
  }

  return normalized;
}

function shouldUseJsonResponseFormat(isOpenRouter: boolean) {
  const configuredValue = readEnvValue("OPENAI_USE_JSON_RESPONSE_FORMAT");

  if (configuredValue === "true") {
    return true;
  }

  if (configuredValue === "false") {
    return false;
  }

  return !isOpenRouter;
}

function readEnvValue(name: string) {
  const rawValue = process.env[name];

  if (!rawValue) {
    return "";
  }

  return rawValue.trim().replace(/^['"]+|['"]+$/g, "");
}