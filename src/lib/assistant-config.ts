export type AssistantEnvironment = Record<string, string | undefined>;

export function getAssistantReadiness(env: AssistantEnvironment = process.env) {
  const provider = env.AL_RABUOI_AI_PROVIDER?.trim() ?? "";
  const apiKey = env.AL_RABUOI_AI_API_KEY?.trim() ?? "";
  const missing: string[] = [];

  if (!provider) missing.push("AL_RABUOI_AI_PROVIDER");
  if (!apiKey) missing.push("AL_RABUOI_AI_API_KEY");

  return {
    name: "AL-RABUOI" as const,
    ready: missing.length === 0,
    missing,
  };
}
