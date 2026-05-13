# METRICS

## North Star Metric

**Qualified leads generated per week** — defined as email captures from audits showing ≥$100/month in identified savings.

This is the North Star because it directly measures whether SpendScope is fulfilling its dual purpose: genuinely helping users (they found real savings, not manufactured ones) and generating value for Credex (these are pre-qualified prospects with a demonstrated pain point and a specific savings number). Raw audit completions would reward traffic with no business intent. Total email captures would reward low-savings audits that have no conversion potential. Qualified leads filters for both quality and commercial relevance.

---

## 3 Input Metrics That Drive the North Star

**1. Audit completion rate (landing → audit submitted)**
If users land and don't complete the form, the top of the funnel is broken — either the form is too long, too confusing, or the value proposition isn't landing. Target: ≥40%.

**2. High-savings audit rate (% of completed audits showing ≥$100/mo savings)**
This is driven by the accuracy and coverage of the audit engine. If most audits return zero savings, users aren't getting value and the lead quality collapses. Target: ≥35% of completed audits show meaningful savings. If this drops, it means either the pricing data is stale or the tool is attracting users who are already spending optimally.

**3. Email capture rate from high-savings audits**
Of users who see ≥$100/month in savings, what % give their email? This measures whether the results page is compelling enough to convert. Target: ≥30%. If this is low, the results page design or CTA copy needs work — the value is there but we're not capturing it.

---

## What to Instrument First

1. **Audit form completion funnel** — track drop-off at each step (tool added, plan selected, form submitted). Identifies where users abandon.
2. **Savings distribution** — histogram of savings amounts across all audits. Shows whether the engine is calibrated correctly or returning mostly zeros.
3. **Email capture rate segmented by savings tier** — separate rates for <$100, $100-500, >$500. Tells us whether the Credex CTA threshold is set correctly.
4. **Share link clicks** — how many people click the "copy report link" button and how many of those links are actually opened by a second person. This is the viral coefficient.

All of these can be captured with a simple event tracking setup (PostHog free tier or Plausible) without any backend changes.

---

## Pivot Trigger

If after **500 completed audits**, the high-savings audit rate is below 20% — meaning fewer than 1 in 5 users find meaningful savings — the audit engine logic needs a fundamental rethink. Either the tool is attracting the wrong users (people already on optimal plans), the pricing benchmarks are wrong, or the recommendation thresholds are set too conservatively. At that point, the pivot would be to focus on a narrower use case (e.g., only API spend, where overspending patterns are more predictable) rather than trying to cover all tools at once.

Secondary pivot trigger: if email capture rate from high-savings audits stays below 15% after UX iteration, the value proposition on the results page is not landing and the email gate mechanism needs a fundamental redesign.