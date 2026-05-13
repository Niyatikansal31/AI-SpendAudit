# USER INTERVIEWS

## Interview 1 — A.K., CS Student / Side Project Builder

**Role:** Final-year CS student  
**Company stage:** Personal projects, hackathons  
**Date:** May 2026  
**Duration:** ~12 minutes

### Background

A.K. regularly builds hackathon and side-project prototypes. He actively uses ChatGPT, Cursor, GitHub Copilot, and v0 across his development workflows and has been paying for multiple AI subscriptions for over a year.

### Direct Quotes

> "I honestly stopped tracking which AI subscriptions I'm still paying for."

> "Most of the time I just buy the tool everyone on Twitter is talking about."

> "I probably overlap between Cursor, Copilot, and ChatGPT more than I should."

### Most Surprising Thing He Said

Convenience mattered more to him than cost savings. Even when two tools solved the same problem, he preferred keeping both because switching context felt annoying — not laziness, but a genuine preference for redundancy over friction. He wasn't looking to optimize; he was looking to not think about it.

### What It Changed in the Product

This pushed me to prioritize overlapping-tool recommendations in the audit engine, not just expensive plan detection. A user like A.K. would get more value from seeing "you're paying for Cursor and GitHub Copilot and using both for the same thing" than from "downgrade to a cheaper plan." It also reinforced keeping the results page skimmable — A.K. said he'd close a report that felt like homework.

---

---

## Interview 2 — S.G., College Senior / Ex-Startup Intern

**Role:** College senior, recently completed internship at an early-stage startup  
**Company stage:** Internship at ~10-person engineering team  
**Date:** May 2026  
**Duration:** ~13 minutes

### Background

S.G. interned at a small startup where the engineering team actively used AI coding tools and APIs during development sprints. He had direct visibility into how the team adopted and managed (or didn't manage) AI tooling spend.

### Direct Quotes

> "The team kept adding AI tools during crunch periods without really checking overlap."

> "Nobody individually owns AI spend, so subscriptions just keep stacking."

> "API bills are harder to notice because they feel less visible than subscriptions."

### Most Surprising Thing He Said

Most AI tooling decisions at smaller startups happen reactively, not strategically. Teams adopt tools quickly to improve productivity during high-pressure periods, but almost nobody revisits whether every subscription is still necessary afterward. The spend doesn't grow from bad intentions — it grows from nobody having ownership of the problem.

### What It Changed in the Product

This reinforced that the product should focus on visibility and simplification, not aggressive optimization. Users don't need to be told they're bad at budgeting — they need a clear picture of what they're actually paying for. It also pushed me to improve API-spend recommendations specifically, since S.G.'s point about API bills feeling "less visible" was something the audit engine wasn't surfacing strongly enough. And it confirmed that the shareable report URL is a real feature — teams need a way to share the audit internally without everyone having to run it themselves.

---

---

## Interview 3 — R.M., Freelance Developer

**Role:** Freelance full-stack developer, 2 years experience  
**Company stage:** Solo / occasional client projects  
**Date:** May 2026  
**Duration:** ~10 minutes

### Background

R.M. works as a freelance developer handling client projects independently. He uses AI tools daily for coding and writing, and pays for most subscriptions out of pocket without any reimbursement.

### Direct Quotes

> "I pay for like three tools and honestly I'm not sure which one I actually need."

> "I always mean to cancel the ones I don't use but I forget until the bill hits."

> "If something showed me exactly what I could cut, I'd use it immediately."

### Most Surprising Thing He Said

He had never sat down to calculate what he was spending on AI tools in total. When asked to estimate, he guessed around $40/month — but when he actually listed his subscriptions out loud, it came closer to $80. The lack of a single consolidated view was the entire problem, not the willingness to optimize.

### What It Changed in the Product

This confirmed that the total spend number needs to be the very first thing users see on the results page — before recommendations, before savings. Many users genuinely don't know their total, and that number alone delivers value. It also reinforced keeping the form simple — R.M. said he would have dropped off if there were more than 5-6 fields per tool.