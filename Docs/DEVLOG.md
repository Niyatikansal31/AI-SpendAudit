# DEVLOG

## Day 1

### Completed

* Set up Express backend foundation
* Added middleware support using `express.json()` and CORS
* Configured MongoDB connection using Mongoose
* Added environment variable support with dotenv
* Implemented a basic `/api/health` route for backend testing
* Created backend folder structure with controllers, models, routes, config, middleware, and utils
* Implemented Report and Lead database models

### Decisions Made

* Used ES Modules instead of CommonJS for consistency
* Kept Lead model separate from Report model
* Stored computed savings values inside reports for snapshot consistency

### Challenges Faced

* Initially mixed CommonJS and ES Module syntax
* Confused `teamSize` with per-tool `seats`
* Environment variables were not loading before calling `dotenv.config()`

### Next Steps

* Create pricing data layer
* Implement audit engine logic
* Add report generation APIs

## Day 2

### Completed

* Created pricing data layer for AI tool plans and pricing
* Implemented rule-based audit engine for AI spend optimization
* Added recommendation logic for ChatGPT, Cursor, GitHub Copilot, Claude, and API usage
* Added estimated monthly and annual savings calculations
* Implemented optimized-state messaging for already cost-efficient stacks
* Built summary generation utility for reports
* Implemented report creation API
* Implemented public report fetching API using UUID-based public IDs
* Connected audit engine, summary generation, and MongoDB report persistence together
* Tested audit engine and report APIs manually using Postman

### Decisions Made

* Used rule-based recommendations instead of AI-generated financial logic for predictability and easier debugging
* Kept pricing data centralized inside a reusable utility layer
* Used public UUIDs instead of MongoDB IDs for shareable report URLs
* Chose template-based summaries for the MVP instead of integrating external AI APIs

### Challenges Faced

* Clarified the difference between route params and query params while testing report fetching
* Ran into async issues while fetching reports from MongoDB
* Needed to correctly handle array methods like `.some()` for recommendation checks
* Fixed logic ordering issues inside summary generation conditions

### Next Steps

* Build lead capture APIs
* Add honeypot spam protection
* Improve validation and API error handling
* Start frontend audit form flow

## Day 3

### Completed

* Implemented lead capture API
* Added honeypot spam protection middleware
* Improved API validation and backend error handling
* Expanded audit recommendation rules for supported AI tools
* Added additional savings recommendation cases and refined audit logic
* Tested report generation and lead submission APIs using Postman
* Updated README and DEVLOG documentation
* Cleaned backend flow and validated API responses

### Decisions Made

* Chose honeypot-based spam protection instead of CAPTCHA to keep the flow frictionless
* Continued keeping recommendation logic rule-based instead of AI-generated for financial reliability
* Expanded audit recommendation logic conservatively to avoid unrealistic optimization claims
* Standardized backend API responses for better frontend integration later

### Challenges Faced

* Recommendation conditions initially overlapped and caused duplicate savings suggestions
* Faced validation edge cases while handling nested tool arrays
* Needed to carefully validate optional lead fields without breaking API flow
* Spent time refining recommendation reasoning to sound financially believable and practical

### Next Steps

* Start frontend setup using React + TypeScript + Vite
* Configure frontend routing and shared layout structure
* Build landing page and audit form UI
* Begin frontend integration with backend APIs

## Day 4

### Completed

* Set up frontend routing and shared layout structure
* Built Navbar and Footer components
* Created landing page with hero section, CTA buttons, and workflow overview
* Built dynamic audit input form UI
* Added:

  * tool selection
  * plan selection
  * seats input
  * monthly spend input
  * add/remove tool functionality
* Implemented frontend form state management using React hooks
* Added localStorage persistence for audit form data across page reloads
* Connected frontend audit flow to backend report API
* Built audit results page showing:

  * total monthly spend
  * estimated monthly savings
  * estimated annual savings
  * recommendation cards
  * summary section
  * optimized-state messaging
* Added copyable report-link functionality
* Tested frontend-backend audit flow end-to-end

### Decisions Made

* Used React Router for lightweight frontend routing
* Chose localStorage persistence instead of introducing authentication/session storage
* Kept frontend styling intentionally minimal with grayscale-focused UI
* Passed report data using navigation state for immediate results rendering
* Continued keeping audit calculations fully backend-driven

### Challenges Faced

* Faced issues with controlled numeric inputs displaying values like `056`
* Initially struggled with localStorage persistence because state initialization overwrote saved values
* Encountered frontend-backend connection issues caused by CORS configuration and incorrect ports
* Needed to better understand React hook execution order while restoring persisted form state
* Spent time structuring dynamic form state updates cleanly for nested tool arrays

### Next Steps

* Implement lead capture flow on results page
* Add honeypot support in frontend lead form
* Build public shareable report page using `/report/:id`
* Fetch report data dynamically from backend
* Add responsive polish and improved loading/error states
