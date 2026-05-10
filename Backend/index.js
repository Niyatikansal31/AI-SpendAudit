import "./config/env.js"
import express from "express"
import cors from "cors"
import ConnectDB from "./config/db.js";
import ReportRoute from "./routes/reportRoutes.js";
import LeadRoute from "./routes/leadRoutes.js";


const app=express();
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/reports',ReportRoute)
app.use('/api/leads',LeadRoute)

ConnectDB()

app.listen(process.env.PORT || 3000)