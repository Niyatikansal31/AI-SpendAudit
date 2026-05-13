# Tests

## How to Run

```bash
cd Backend
npm test
```

All tests use **Vitest** and run against the audit engine directly — no server or database needed.

---

## Test File

**File:** `Backend/tests/auditEngine.test.js`

---

## Test Coverage

| # | Test Name | What it covers |
|---|-----------|---------------|
| 1 | ChatGPT Team → Plus for small teams | When team size ≤ 2 and plan is `team`, engine recommends downgrading to ChatGPT Plus and calculates correct savings |
| 2 | Cursor Business → Pro for small teams | When team size ≤ 2 and plan is `business`, engine recommends Cursor Pro with correct per-seat savings |
| 3 | GitHub Copilot Business → Individual for small teams | When team size ≤ 2 and plan is `business`, engine recommends Individual plan |
| 4 | High OpenAI API spend flagged | When API spend > $100/mo for a small team, engine flags it with a usage review recommendation |
| 5 | Optimized message when no savings found | When user is on an appropriate plan (ChatGPT Plus, 1 seat, 1 person), engine returns zero savings and the optimized message |

---

## What the Tests Verify

- Correct `suggestedPlan` string returned for each recommendation case
- `estimatedMonthlySavings` is greater than zero when a recommendation exists
- `estimatedMonthlySavings` is exactly zero when stack is already optimal
- `optimizedMessage` is set correctly when no recommendations are generated
- `recommendations` array is empty when no changes are needed

---

## Known Gaps

- No tests for multi-tool audits (multiple tools submitted simultaneously)
- No tests for annual savings calculation
- No tests for Claude or Gemini downgrade cases
- No integration tests for the Express API layer
- No frontend tests

These would be the first additions in week 2.