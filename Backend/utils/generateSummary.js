const CheckAPI = (auditResult) => {
    return auditResult.recommendations.some((recommendation) =>
        recommendation.toolName == "OpenAIAPI" ||
        recommendation.toolName == "AnthropicAPI"
    )
}

const generateSummary=(auditResult)=>{
    let summary=""

    if(CheckAPI(auditResult)){
        summary="A large portion of your projected savings appears related to API usage costs. For smaller teams, usage-based billing can grow quickly without clear visibility into efficiency. Reviewing request patterns, token consumption, and opportunities to shift some workflows toward subscription-based tools may help reduce ongoing spend while keeping similar functionality."
    }else if(auditResult.estimatedMonthlySavings===0){
        summary="Your AI tooling stack currently appears cost-efficient based on the submitted plans, team size, and usage patterns. We did not identify clear downgrade or consolidation opportunities that would significantly reduce monthly spend without affecting workflow quality. Your current setup looks appropriately matched to your team's needs.";
    }else if(auditResult.estimatedMonthlySavings > 0 && auditResult.estimatedMonthlySavings < 500){
        summary="We identified a few practical opportunities to reduce your AI tooling costs while maintaining similar functionality for your current workflow. Most recommendations are related to plan sizing, team fit, and avoiding higher-tier subscriptions that may not be necessary for smaller teams. The projected savings are moderate but could still create meaningful annual cost reductions."
    }else if(auditResult.estimatedMonthlySavings >= 500){
        summary="Your audit shows significant optimization potential across the current AI tooling stack. Several subscriptions and usage patterns appear over-provisioned relative to the reported team size and workflow requirements. Implementing the suggested recommendations could meaningfully reduce recurring operational costs while preserving most existing capabilities and productivity benefits."
    }

    return summary
}

export default generateSummary