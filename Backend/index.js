import express from "express"
import cors from "cors"
import Report from "./models/Report.js";
import Lead from "./models/Lead.js";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv"
dotenv.config()

const app=express();
app.use(express.json())
app.use(cors())
app.get('/test',(req,res)=>{
    res.json({
        msg: "Backend Running!"
    })
})
ConnectDB()

app.listen(process.env.PORT || 3000)