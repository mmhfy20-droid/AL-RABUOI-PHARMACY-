import { describe, expect, it } from "vitest";
import { getAssistantReadiness } from "../assistant-config";

describe("getAssistantReadiness", () => {
  it("identifies AL-RABUOI as the assistant and reports missing configuration", () => {
    const result = getAssistantReadiness({});
    expect(result.name).toBe("AL-RABUOI");
    expect(result.ready).toBe(false);
    expect(result.missing).toEqual(["AL_RABUOI_AI_PROVIDER", "AL_RABUOI_AI_API_KEY"]);
  });

  it("does not expose the API key in its public readiness result", () => {
    const result = getAssistantReadiness({
      AL_RABUOI_AI_PROVIDER: "openai-compatible",
      AL_RABUOI_AI_API_KEY: "secret-value",
    });
    expect(result.ready).toBe(true);
    expect(JSON.stringify(result)).not.toContain("secret-value");
  });

  it("treats whitespace-only credentials as missing", () => {
    const result = getAssistantReadiness({
      AL_RABUOI_AI_PROVIDER: "   ",
      AL_RABUOI_AI_API_KEY: "   ",
    });
    expect(result.ready).toBe(false);
  });
});
