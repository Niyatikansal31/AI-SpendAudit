import mongoose from "mongoose"

const ReportSchema=new mongoose.Schema(
    {
        publicId: {
            type: String,
            required: true,
            unique: true
        },
        tools: {
            type: [
            {
                toolName: String,
                plan: String,
                seats: Number,
                monthlySpend: Number
            }
            ],
            required: true
        },
        totalMonthlySpend: {
            type: Number
        },
        estimatedMonthlySavings: {
            type: Number
        },
        estimatedAnnualSavings: {
            type: Number
        },
        recommendations: {
            type: [
                {
                    currenPlan:  String,
                    suggestedPlan: String,
                    savings:  Number,
                    reason:  String
                }
            ],
            required: true,
            default: []
        },
        summary: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
const Report=mongoose.model('Report',ReportSchema)
export default Report