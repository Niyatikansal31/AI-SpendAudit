import runAudit from "../utils/auditEngine.js";
import generateSummary from "../utils/generateSummary.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import Report from "../models/Report.js";
import crypto from "crypto"

const createReport=async (req,res)=>{
    const {tools, teamSize, useCase} =req.body;

    if(!tools || !teamSize || !useCase){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please enter complete details!"
        })
        return;
    }

    try{
        const suggestion=runAudit(tools,teamSize,useCase)
        const summary=generateSummary(suggestion)

        const publicId=crypto.randomUUID();

        const report=new Report({
            publicId,
            useCase,
            tools,
            totalMonthlySpend: suggestion.totalMonthlySpend,
            estimatedMonthlySavings: suggestion.estimatedMonthlySavings,
            estimatedAnnualSavings: suggestion.estimatedAnnualSavings,
            recommendations: suggestion.recommendations,
            summary
        })

        await report.save();
        res.status(STATUS_CODES.CREATED).json({
            report
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: "Error displaying report!"
        })
        return;
    }
}

const getReportById=async (req,res)=>{
    const id=req.params.id;

    if(!id){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please enter a valid id."
        })
        return;
    }
    try{
        const repo=await Report.findOne({publicId: id});
        if(!repo){
            res.status(STATUS_CODES.NOT_FOUND).json({
                msg: "Could not find report with this id!"
            })
            return;
        }
        res.status(STATUS_CODES.OK).json({
            report: repo
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: "Some error occured while fetching the report"
        })
        return;
    }
}

export {createReport,getReportById}