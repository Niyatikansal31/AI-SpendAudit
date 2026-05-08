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
