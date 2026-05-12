import Groq from "groq-sdk";
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateAISummary = async (
  recommendations,
  estimatedMonthlySavings,
  estimatedAnnualSavings,
  totalMonthlySpend
) => {
  try {
    const formattedRecommendations = recommendations
      .map((recommendation) => {
        return `
            Tool: ${recommendation.toolName}
            Current Plan: ${recommendation.currentPlan}
            Suggested Plan: ${recommendation.suggestedPlan}
            Monthly Savings: $${recommendation.savings}
            Reason: ${recommendation.reason}
        `;
        })
        .join("\n");

        const prompt = `
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
        `;

        const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
            role: "user",
            content: prompt,
            },
        ],
        temperature: 0.7,
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.log("AI Summary Error:", err.message);
        return null;
    }
};

export default generateAISummary;