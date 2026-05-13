# REFLECTION

## 1. The hardest bug you hit this week, and how you debugged it

The hardest bug hit me on Day 6 during deployment. Everything worked perfectly on my local machine — backend started, frontend built, all routes responded. But the moment I deployed to Render, the backend crashed immediately. The log just said "Exited with status 1" which told me nothing useful.

My first thought was that the environment variables weren't loading correctly, so I double-checked all of them on Render — they were all there. Then I looked more carefully at the logs and saw the actual error: `Cannot find module './models/Lead.js'`. That was confusing because the file clearly existed in VS Code showing as `Lead.js`.

Then it hit me — I'm on Windows. I ran `git ls-files | grep lead` in the terminal and saw `Backend/models/lead.js` — lowercase l. Git had been tracking the lowercase version the entire time. When I renamed it in VS Code, Windows treated it as the same file so Git never detected any change. But Linux on Render is case-sensitive and couldn't find `Lead.js` because the actual file in the repo was `lead.js`.

The fix was `git mv Backend/models/lead.js Backend/models/Lead.js` — same issue existed with `Frontend/pages/landing.tsx`. After pushing both renames, the deployment went live. Genuinely didn't know this was a thing before this week.

---

## 2. A decision you reversed mid-week, and what made you reverse it

On Day 2 I decided to skip the external AI API integration and just use templated summaries for the audit report. My thinking was that the templates would be good enough and I didn't want to deal with API keys, quotas, and failure handling. I told myself the rule-based audit engine was the real value anyway.

I reversed this on Day 5 when I re-read the assignment brief. It literally says "This is the one feature where you must use AI." I had somehow convinced myself the template was fine, but it wasn't optional at all. So I integrated OpenAI, wrote the prompt, added the fallback so the template kicks in only when the API actually fails.

Ironically, the fallback I had built originally ended up being exactly what the spec wanted — just as a backup, not the primary. And then on Day 7 when OpenAI quota ran out during production testing, the fallback actually saved me. So the decision to build the template first wasn't wasted, just misapplied.

---

## 3. What you would build in week 2

The thing I most want to fix is the shareable report URL. Right now when you share `/report/:id` on Twitter or WhatsApp, it shows a generic preview — the same title and description for every report. The whole point of the share feature is that someone sees "I saved $480/month" in the preview and clicks it. That's the viral loop. Without dynamic OG tags per report, it's just a link with no context.

Fixing this properly requires either switching to Next.js for SSR or using a meta-tag proxy service. That's a real architectural change that I didn't have time to do properly this week, so I shipped it knowing it was incomplete.

After that I'd build the benchmark mode — "your AI spend per developer is $X, companies your size average $Y." Once there are a few hundred audits in the database, you have enough data to make this meaningful. It gives users a reason to come back and also makes the tool more shareable because people love comparing themselves to benchmarks.

---

## 4. How you used AI tools

I used Claude and Cursor throughout the week.

Claude I used mostly for debugging and getting unstuck — when I had an async issue in the audit engine, I'd explain what I was seeing and ask what I was missing. It was good at spotting things like the Promise not being awaited before saving to MongoDB. I also used it to help structure the Groq API integration when I switched from OpenAI on the last day.

Cursor I used for autocomplete while writing repetitive frontend code — the form input handlers, the recommendation card components, loading state patterns. Saves a lot of typing.

What I didn't use AI for: the audit engine recommendation logic and the pricing data. Those needed to be accurate and defensible. I verified every price manually against the vendor's actual pricing page. I didn't trust AI to get those numbers right and I was correct not to — when I asked Claude about GitHub Copilot pricing early on it gave me a slightly outdated number that didn't match the current page.

That's the one specific time AI was wrong — it told me GitHub Copilot Individual was $10/month billed annually which comes out to ~$8.33/month. The current page shows $10/month billed monthly or $100/year. Small difference but the kind of thing that matters when a finance person is reading your audit reasoning.

---

## 5. Self-rating

**Discipline: 8/10** — I worked every day from May 7 to May 13 with real commits each day. I didn't cram it all into the last two days. Losing points because I left documentation to the last day which made Day 7 heavier than it needed to be.

**Code quality: 7/10** — Backend structure is clean and I'm happy with the separation of concerns. Frontend has some rough spots — the Results page component is too big and should be split up..

**Design sense: 6/10** — It looks clean and readable but it's not visually impressive. The savings numbers on the results page should hit harder — bigger, more prominent. I made a deliberate call to keep it minimal rather than risk making it look messy,just wanted to made it on time.

**Problem-solving: 7/10** — Debugged the Linux casing issue without help, caught the async Promise bug, pivoted to Groq quickly when OpenAI quota ran out. I generally figured out what was wrong before randomly changing things. Lost a point for not catching the AI summary requirement earlier — I re-read the brief and should have caught that on Day 1.

**Entrepreneurial thinking: 6/10** — I understood what the product was supposed to do and why — lead gen through genuine value. Made the right calls like showing email capture after the audit not before, and being honest when a stack is already optimized. Where I fell short is I didn't talk to enough real users during the week to validate whether the form fields and recommendation logic actually matched how people think about their AI spend.