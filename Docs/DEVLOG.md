# DEVLOG

## Day 1

### Completed
- Set up Express backend foundation
- Added middleware support using `express.json()` and CORS
- Configured MongoDB connection using Mongoose
- Added environment variable support with dotenv
- Implemented a basic `/test` route for backend testing
- Created initial backend folder structure
- Implemented Report and Lead models
- Designed schemas for storing audit reports, recommendations, and lead capture data

### Decisions Made
- Used ES Modules instead of CommonJS for consistency
- Kept Lead model separate from Report model
- Stored computed savings values inside reports for snapshot consistency
- Added `teamSize` and `useCase` inside Report model because audit rules depend on them

### Challenges Faced
- Initially mixed CommonJS and ES Module syntax
- Confused `teamSize` with per-tool `seats`
- Environment variables were not loading before calling `dotenv.config()`
- Clarified when to use arrays vs objects for structured pricing/configuration data

### Next Steps
- Build pricing data layer
- Implement rule-based audit engine
- Add report generation APIs
- Test audit calculations manually