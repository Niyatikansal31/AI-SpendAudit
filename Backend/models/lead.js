import mongoose from "mongoose"

const LeadSchema=new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        company: String,
        role:String,
        teamSize: Number
    },{
        timestamps: true
    }
)
const Lead=mongoose.model('Lead',LeadSchema)
export default Lead