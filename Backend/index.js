import express from "express"
import cors from "cors"
import Report from "./models/Report.js";
import Lead from "./models/Lead.js";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv"
import ReportRoute from "./routes/reportRoutes.js";
import LeadRoute from "./routes/leadRoutes.js";

dotenv.config()

const app=express();
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/reports',ReportRoute)
app.use('/api/leads',LeadRoute)

ConnectDB()

app.listen(process.env.PORT || 3000)