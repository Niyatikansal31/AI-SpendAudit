# DEVLOG

## Day 1 — 2026-05-07

**Hours worked:** 4

**What I did:** Set up Express backend foundation. Added middleware support using `express.json()` and CORS. Configured MongoDB connection using Mongoose. Added environment variable support with dotenv. Implemented a basic `/api/health` route for backend testing. Created backend folder structure with controllers, models, routes, config, middleware, and utils. Implemented Report and Lead database models.

**What I learned:** ES Modules in Node.js require explicit `.js` extensions in import paths — something CommonJS doesn't enforce. Also learned to keep `dotenv.config()` as the very first call before any other imports that rely on environment variables.

**Blockers / what I'm stuck on:** Initially mixed CommonJS and ES Module syntax which caused import errors. Confused `teamSize` (overall team) with per-tool `seats` — needed to keep both as separate fields. Environment variables were not loading before calling `dotenv.config()`.

**Plan for tomorrow:** Create pricing data layer, implement audit engine logic, add report generation APIs.

---

## Day 2 — 2026-05-08

**Hours worked:** 5

**What I did:** Created pricing data layer for AI tool plans and pricing. Implemented rule-based audit engine for AI spend optimization. Added recommendation logic for ChatGPT, Cursor, GitHub Copilot, Claude, and API usage. Added estimated monthly and annual savings calculations. Implemented optimized-state messaging for already cost-efficient stacks. Built summary generation utility for reports. Implemented report creation API and public report fetching API using UUID-based public IDs. Connected audit engine, summary generation, and MongoDB report persistence together. Tested everything manually using Postman.

**What I learned:** Rule-based financial logic needs careful condition ordering — overlapping conditions caused duplicate recommendations. Fixed by making each condition mutually exclusive. Also learned the difference between route params and query params while testing report fetching.

**Blockers / what I'm stuck on:** Ran into async issues while fetching reports from MongoDB. Needed to correctly handle array methods like `.some()` for recommendation checks. Fixed logic ordering issues inside summary generation conditions.

**Plan for tomorrow:** Build lead capture APIs, add honeypot spam protection, improve validation and API error handling, start frontend audit form flow.

---

## Day 3 — 2026-05-09

**Hours worked:** 5

**What I did:** Implemented lead capture API. Added honeypot spam protection middleware. Improved API validation and backend error handling. Expanded audit recommendation rules for supported AI tools. Added additional savings recommendation cases and refined audit logic. Tested report generation and lead submission APIs using Postman. Updated README and DEVLOG documentation. Cleaned backend flow and validated API responses.

**What I learned:** Honeypot middleware needs to check a hidden field that legitimate frontends never fill — named it `website`. Any request where that field is non-empty gets rejected before hitting the controller. Learned to expand audit logic conservatively to avoid unrealistic optimization claims.

**Blockers / what I'm stuck on:** Recommendation conditions initially overlapped and caused duplicate savings suggestions. Faced validation edge cases while handling nested tool arrays. Needed to carefully validate optional lead fields without breaking API flow.

**Plan for tomorrow:** Start frontend setup using React + TypeScript + Vite, configure frontend routing and shared layout structure, build landing page and audit form UI, begin frontend integration with backend APIs.

---

## Day 4 — 2026-05-10

**Hours worked:** 6

**What I did:** Set up frontend routing and shared layout structure. Built Navbar and Footer components. Created landing page with hero section, CTA buttons, and workflow overview. Built dynamic audit input form UI with tool selection, plan selection, seats input, monthly spend input, and add/remove tool functionality. Implemented frontend form state management using React hooks. Added localStorage persistence for audit form data across page reloads. Connected frontend audit flow to backend report API. Built audit results page showing total monthly spend, estimated monthly/annual savings, recommendation cards, summary section, and optimized-state messaging. Added copyable report-link functionality. Tested frontend-backend audit flow end-to-end.

**What I learned:** localStorage persistence needs to initialize state from storage before React's useState default runs — otherwise saved state gets overwritten on mount. Fixed by reading from localStorage inside the useState initializer function. Also understood React hook execution order more deeply while restoring persisted form state.

**Blockers / what I'm stuck on:** Faced issues with controlled numeric inputs displaying values like `056`. Initially struggled with localStorage persistence because state initialization overwrote saved values. Encountered frontend-backend connection issues caused by CORS configuration and incorrect ports.

**Plan for tomorrow:** Implement lead capture flow on results page, add honeypot support in frontend lead form, build public shareable report page using `/report/:id`, fetch report data dynamically from backend, add responsive polish and improved loading/error states.

---

## Day 5 — 2026-05-11

**Hours worked:** 5

**What I did:** Implemented lead capture flow on the results page with frontend honeypot support. Built public shareable report page using `/report/:id`. Connected frontend report fetching with backend public report API. Added AI-generated audit summaries using external LLM integration with graceful fallback when API calls fail. Improved report page layout and recommendation rendering. Added loading and error handling for report fetching. Tested full audit flow from frontend submission to public report rendering.

**What I learned:** Accidentally passed unresolved Promise objects into MongoDB documents during AI summary generation — learned to always await async calls before passing results to Mongoose. Also learned to strip identifying fields at the API level on public report routes so email and company name never leave the server.

**Blockers / what I'm stuck on:** Faced OpenAI quota and API failure issues while testing summaries. Needed to carefully handle async flows between report creation and summary generation. Spent time debugging frontend report fetching and route handling issues.

**Plan for tomorrow:** Add transactional email flow, add Open Graph previews, write automated audit engine tests, add CI workflow and deployment setup.

---

## Day 6 — 2026-05-12

**Hours worked:** 5

**What I did:** Implemented transactional audit email delivery using Resend. Added optional email sending support through lead capture flow. Added public report share previews and Credex consultation CTA for high-savings audits. Added printable PDF export support using browser print styling. Wrote 5 automated tests covering audit engine recommendation logic using Vitest. Configured GitHub Actions CI workflow for tests and lint checks on every push to main. Fixed deployment readiness by replacing hardcoded localhost URLs with environment variables. Added frontend and backend `.env.example` files. Fixed Linux case-sensitivity issues using `git mv` for `lead.js` → `Lead.js` and `landing.tsx` → `Landing.tsx`.

**What I learned:** Git on Windows/macOS doesn't track renames that only change case — the filesystem is case-insensitive so Git sees no diff. `git mv` forces Git to record the rename explicitly, which Linux deployment servers need. This bug only appeared at deployment time, not locally.

**Blockers / what I'm stuck on:** Faced environment variable loading issues during production testing. Linux case-sensitivity issues appeared only at deploy time. Had to carefully handle conditional email sending behavior in the lead flow.

**Plan for tomorrow:** Deploy backend to Render, deploy frontend to Vercel, full production testing, finalize all documentation.

---

## Day 7 — 2026-05-13

**Hours worked:** 4

**What I did:** Deployed backend to Render (Singapore region). Deployed frontend to Vercel. Connected frontend and backend production environment variables. Tested live audit flow end-to-end in production. Replaced OpenAI summaries with Groq-based generation (Llama 3.3 70B) due to OpenAI quota exhaustion — required changing only 3 lines since Groq uses an OpenAI-compatible API. Finalized PDF export and report sharing polish. Completed all submission documentation — README, ARCHITECTURE, DEVLOG, REFLECTION, TESTS, GTM, ECONOMICS, LANDING_COPY, METRICS, PROMPTS, PRICING_DATA. Reviewed commit history and finalized submission structure.

**What I learned:** Production deployment exposes issues invisible locally — case-sensitive filenames, environment variable coordination between two platforms (Render + Vercel), and the importance of end-to-end testing on live URLs before submission day.

**Blockers / what I'm stuck on:** OpenAI quota ran out during production testing — switched to Groq as a free alternative. Environment variables needed careful coordination between Render and Vercel dashboards.
