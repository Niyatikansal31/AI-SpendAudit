import pricingData from "./pricingData.js";

const runAudit = (tools, teamSize, useCase) => {
  let estimatedMonthlySavings = 0;
  let estimatedAnnualSavings = 0;
  let recommendations = [];
  let totalMonthlySpend = 0;

  for (const tool of tools) {
    totalMonthlySpend += tool.monthlySpend;

    if (tool.toolName === "ChatGPT" && teamSize <= 2 && tool.plan === "team") {
      recommendations.push({
        toolName: tool.toolName,
        currentPlan: tool.plan,
        suggestedPlan: "ChatGPT Plus",
        savings: (pricingData.ChatGPT.team - pricingData.ChatGPT.plus) * tool.seats,
        reason: "For teams with 2 or fewer users, ChatGPT Plus is usually sufficient and more cost-efficient than the Team plan."
      });
    }

    else if (tool.toolName === "ChatGPT" && teamSize < 10 && tool.plan === "enterprise") {
      recommendations.push({
        toolName: tool.toolName,
        currentPlan: tool.plan,
        suggestedPlan: "ChatGPT Team",
        savings: (pricingData.ChatGPT.enterprise - pricingData.ChatGPT.team) * tool.seats,
        reason: "ChatGPT Enterprise is usually better suited for larger organizations. Smaller teams may get enough value from the Team plan at a lower cost."
      });
    }

    else if (tool.toolName === "Cursor" && teamSize <= 2 && tool.plan === "business") {
      recommendations.push({
        toolName: tool.toolName,
        currentPlan: tool.plan,
        suggestedPlan: "Cursor Pro",
        savings: (pricingData.Cursor.business - pricingData.Cursor.pro) * tool.seats,
        reason: "Cursor Business may be unnecessary for very small development teams. Cursor Pro typically provides enough functionality at a lower cost."
      });
    }

    else if (tool.toolName === "Cursor" && teamSize < 10 && tool.plan === "enterprise") {
      recommendations.push({
        toolName: tool.toolName,
        currentPlan: tool.plan,
        suggestedPlan: "Cursor Business",
        savings: (pricingData.Cursor.enterprise - pricingData.Cursor.business) * tool.seats,
        reason: "Cursor Enterprise is usually more appropriate for larger teams with advanced administrative needs. Business may be a better fit for smaller teams."
      });
    }

    else if (tool.toolName === "GitHubCopilot" && teamSize <= 2 && tool.plan === "business") {
      recommendations.push({
        toolName: tool.toolName,
        currentPlan: tool.plan,
        suggestedPlan: "GitHub Copilot Individual",
        savings: (pricingData.GitHubCopilot.business - pricingData.GitHubCopilot.individual) * tool.seats,
        reason: "GitHub Copilot Business is generally more suitable for larger organizations. Individual plans are often more cost-effective for small teams."
      });
    }

    else if (tool.toolName === "Claude" && tool.plan === "team" && tool.seats < 5) {
      recommendations.push({
        toolName: tool.toolName,
        currentPlan: tool.plan,
        suggestedPlan: "Claude Pro",
        savings: (pricingData.Claude.team - pricingData.Claude.pro) * tool.seats,
        reason: "Claude Team plans are generally better suited for larger groups. For fewer than 5 seats, Claude Pro is likely the more efficient option."
      });
    }

    else if (tool.toolName === "Claude" && teamSize <= 2 && tool.plan === "max") {
      recommendations.push({
        toolName: tool.toolName,
        currentPlan: tool.plan,
        suggestedPlan: "Claude Pro",
        savings: (pricingData.Claude.max - pricingData.Claude.pro) * tool.seats,
        reason: "Claude Max may be excessive for very small teams unless usage is consistently heavy. Claude Pro can be a more cost-efficient option."
      });
    }

    else if (tool.toolName === "Gemini" && teamSize <= 2 && tool.plan === "ultra") {
      recommendations.push({
        toolName: tool.toolName,
        currentPlan: tool.plan,
        suggestedPlan: "Gemini Pro",
        savings: (pricingData.Gemini.ultra - pricingData.Gemini.pro) * tool.seats,
        reason: "Gemini Ultra may be over-provisioned for very small teams. Gemini Pro is likely sufficient for lighter or early-stage usage."
      });
    }

    else if (tool.toolName === "v0" && teamSize <= 2 && tool.plan === "team") {
      recommendations.push({
        toolName: tool.toolName,
        currentPlan: tool.plan,
        suggestedPlan: "v0 Premium",
        savings: (pricingData.v0.team - pricingData.v0.premium) * tool.seats,
        reason: "For very small teams, v0 Premium may provide enough functionality without needing the Team plan."
      });
    }

    else if (
      (
        tool.toolName === "OpenAIAPI" ||
        tool.toolName === "AnthropicAPI" ||
        (tool.toolName === "ChatGPT" && tool.plan === "api") ||
        (tool.toolName === "Claude" && tool.plan === "api") ||
        (tool.toolName === "Gemini" && tool.plan === "api")
      ) &&
      teamSize <= 2 &&
      tool.monthlySpend > 100
    ) {
      recommendations.push({
        toolName: tool.toolName,
        currentPlan: "API usage-based billing",
        suggestedPlan: "Review API usage or consider subscription-based plans",
        savings: tool.monthlySpend * 0.2,
        reason: "Your API spending appears relatively high for a small team. Reviewing usage patterns or switching some workflows to subscription plans may reduce costs."
      });
    }
  }

  for (const recommended of recommendations) {
    estimatedMonthlySavings += recommended.savings;
  }

  estimatedAnnualSavings = estimatedMonthlySavings * 12;

  const optimizedMessage =
    estimatedMonthlySavings === 0
      ? "Your stack already looks cost-efficient."
      : "We found a few opportunities to optimize your AI tooling spend.";

  return {
    totalMonthlySpend,
    estimatedMonthlySavings,
    estimatedAnnualSavings,
    recommendations,
    optimizedMessage
  };
};

export default runAudit;