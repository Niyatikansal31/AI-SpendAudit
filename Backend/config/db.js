import mongoose from "mongoose"

import { config } from "dotenv"
const ConnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected!")
    }catch(err){
        console.log("Error Occored!Cannot Connect Database!")
        process.exit(1)
    }
}

export default ConnectDB;