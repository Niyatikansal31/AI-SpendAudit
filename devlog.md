# DEVLOG

## Day 1

### Completed
- Set up Express backend foundation
- Configured MongoDB connection using Mongoose
- Added environment variable support with dotenv
- Created initial backend folder structure
- Implemented Report and Lead models
- Designed report schema for storing audit outputs and recommendations

### Decisions Made
- Used ES Modules instead of CommonJS for consistency
- Kept Lead model separate from Report model
- Stored computed savings values inside reports for snapshot consistency
- Added `teamSize` inside Report model because audit rules depend on it

### Challenges Faced
- Mixed CommonJS and ES Module syntax initially
- Confused `teamSize` with tool `seats`
- dotenv variables were not loading before calling `dotenv.config()`

### Next Steps
- Build pricing data layer
- Implement audit engine logic
- Add report generation APIs