import { describe, it, expect } from "vitest";
import runAudit from "../utils/auditEngine.js";

describe("audit engine", () => {
  it("recommends ChatGPT Plus for small teams on ChatGPT Team", () => {
    const result = runAudit(
      [{ toolName: "ChatGPT", plan: "team", seats: 2, monthlySpend: 60 }],
      2,
      "coding"
    );

    expect(result.recommendations[0].suggestedPlan).toBe("ChatGPT Plus");
    expect(result.estimatedMonthlySavings).toBeGreaterThan(0);
  });

  it("recommends Cursor Pro for very small teams on Cursor Business", () => {
    const result = runAudit(
      [{ toolName: "Cursor", plan: "business", seats: 2, monthlySpend: 80 }],
      2,
      "coding"
    );

    expect(result.recommendations[0].suggestedPlan).toBe("Cursor Pro");
  });

  it("recommends GitHub Copilot Individual for small teams on Business", () => {
    const result = runAudit(
      [{ toolName: "GitHubCopilot", plan: "business", seats: 2, monthlySpend: 38 }],
      2,
      "coding"
    );

    expect(result.recommendations[0].suggestedPlan).toBe("GitHub Copilot Individual");
  });

  it("flags high OpenAI API spend for small teams", () => {
    const result = runAudit(
      [{ toolName: "OpenAIAPI", plan: "usage", seats: 1, monthlySpend: 250 }],
      2,
      "coding"
    );

    expect(result.recommendations[0].suggestedPlan).toBe(
      "Review API usage or consider subscription-based plans"
    );
  });

  it("returns optimized message when no savings are found", () => {
    const result = runAudit(
      [{ toolName: "ChatGPT", plan: "plus", seats: 1, monthlySpend: 20 }],
      1,
      "writing"
    );

    expect(result.recommendations.length).toBe(0);
    expect(result.estimatedMonthlySavings).toBe(0);
    expect(result.optimizedMessage).toBe("Your stack already looks cost-efficient.");
  });
});