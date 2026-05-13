# Prompts

## AI Summary Generation Prompt

Used in `Backend/utils/generateAISummary.js` via Groq API (Llama 3.3 70B).

```
You are an AI finance assistant helping startups reduce AI tooling costs.

Generate a concise personalized audit summary in around 80-120 words.

Audit Data:
- Total Monthly Spend: $${totalMonthlySpend}
- Estimated Monthly Savings: $${estimatedMonthlySavings}
- Estimated Annual Savings: $${estimatedAnnualSavings}

Recommendations:
${formattedRecommendations}

Instructions:
- Sound professional and financially practical
- Mention overspending patterns if present
- Mention if the stack already looks optimized
- Do not use bullet points
- Keep it concise and readable
```

---

## Why I Wrote It This Way

**Role framing:** "AI finance assistant" sets the tone — practical, numbers-focused, not generic. Without this, early versions of the prompt returned cheerful marketing-style copy ("Great news! You can save money!") instead of sober financial analysis.

**Word count constraint (80-120 words):** The summary appears on the results page next to a data table. Too long and it competes with the numbers. Too short and it feels dismissive. 80-120 words is enough for 2-3 meaningful observations.

**"Do not use bullet points":** The first version returned bullet points, which duplicated the recommendation cards already shown on the page. The summary should synthesize, not repeat.

**Passing structured recommendation data:** Early versions only passed total savings numbers. The model produced generic summaries ("you could save money by switching plans"). Passing the full per-tool breakdown gave it enough context to mention specific tools and patterns.

---

## What I Tried That Didn't Work

**Asking for a "friendly" tone:** Produced summaries that felt like marketing copy, not financial advice. Removed the tone instruction entirely and let "finance assistant" framing carry it.

**Asking for a specific format (intro + findings + CTA):** The model followed the format rigidly but the output felt templated — exactly what the prompt was supposed to avoid. Dropped the format constraint and let the model structure it naturally.

**Shorter prompt with less data:** Passing only `estimatedMonthlySavings` produced vague summaries. The model needs the per-tool breakdown to say anything specific.

---

## Fallback

If the Groq API call fails (timeout, quota, network error), `generateSummary.js` returns a templated string based on the savings amount:

- Savings > 0: `"Based on your current AI tool subscriptions, we identified potential monthly savings of $X (annual: $Y). Consider reviewing your plan selections and team size to optimize spend."`
- Savings = 0: `"Your current AI tool stack appears to be well-optimized for your team size and usage patterns. No immediate changes are recommended."`

The app never shows an error to the user — it silently falls back to the template.