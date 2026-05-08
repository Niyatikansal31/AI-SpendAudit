import pricingData from "./pricingData.js";
const runAudit =(tools,teamSize,useCase)=>{
    let estimatedMonthlySavings=0;
    let estimatedAnnualSavings=0;
    let recommendations=[];
    let totalMonthlySpend=0;
    for (const tool of tools) {
        totalMonthlySpend+=tool.monthlySpend;

        if(tool.toolName=="ChatGPT" && teamSize<=2 && tool.plan=="team"){
            recommendations.push({
                toolName: tool.toolName,
                currentPlan: tool.plan,
                suggestedPlan: "ChatGPT plus",
                savings: (pricingData.ChatGPT.team-pricingData.ChatGPT.plus)*tool.seats,
                reason: "For teams with 2 or fewer users, ChatGPT Plus is usually sufficient and more cost-efficient than the Team plan."
            })
        }
        else if(tool.toolName=="Cursor" && teamSize<=2 && tool.plan=="business"){
            recommendations.push({
                toolName: tool.toolName,
                currentPlan: tool.plan,
                suggestedPlan: "Cursor Pro",
                savings: (pricingData.Cursor.business-pricingData.Cursor.pro)*tool.seats,
                reason: "Cursor Business may be unnecessary for very small development teams. Cursor Pro typically provides enough functionality at a lower cost."
            })
        }
        else if(tool.toolName=="GitHubCopilot" && teamSize<=2 && tool.plan=="business"){
            recommendations.push({
                toolName: tool.toolName,
                currentPlan: tool.plan,
                suggestedPlan: "GitHub Copilot Individual",
                savings: (pricingData.GitHubCopilot.business-pricingData.GitHubCopilot.individual)*tool.seats,
                reason: "GitHub Copilot Business is generally more suitable for larger organizations. Individual plans are often more cost-effective for small teams."
            })
        }
        else if((tool.toolName=="OpenAIAPI" || tool.toolName=="AnthropicAPI") && teamSize<=2 && tool.monthlySpend>100){
            recommendations.push({
                toolName: tool.toolName,
                currentPlan: "API usage-based billing",
                suggestedPlan: "Review API usage or consider subscription-based plans",
                savings: tool.monthlySpend*0.2,
                reason: "Your API spending appears relatively high for a small team. Reviewing usage patterns or switching some workflows to subscription plans may reduce costs."
            })
        }
        else if(tool.toolName=="Claude" && tool.plan=="team" && tool.seats<5){
            recommendations.push({
                toolName: tool.toolName,
                currentPlan: tool.plan,
                suggestedPlan: "Claude Pro",
                savings: (pricingData.Claude.team-pricingData.Claude.pro)*tool.seats,
                reason: "Claude Team plans are generally better suited for larger groups. For fewer than 5 seats, Claude Pro is likely the more efficient option."
            })
        }
    }
    
    for (const recommended of recommendations){
        estimatedMonthlySavings+=recommended.savings;
    }
    estimatedAnnualSavings=estimatedMonthlySavings*12;

    let optimizedMessage = ""
    if (estimatedMonthlySavings === 0) {
        optimizedMessage = "Your stack already looks cost-efficient."
    } else {
        optimizedMessage = "We found a few opportunities to optimize your AI tooling spend."
    }

    return {
        totalMonthlySpend,
        estimatedMonthlySavings,
        estimatedAnnualSavings,
        recommendations,
        optimizedMessage
    }
}
export default runAudit