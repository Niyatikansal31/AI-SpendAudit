import Lead from "../models/Lead.js"
import STATUS_CODES from "../utils/StatusCodes.js";
import sendAuditEmail from "../utils/sendAuditEmail.js";
import Report from "../models/Report.js";

const createLead=async(req,res)=>{
    const { email, company, role, teamSize, reportId, sendEmail } = req.body;
    if(!email || !reportId){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            msg: "Please enter complete details!"
        })
        return;
    }
    
    try{
        const report = await Report.findOne({ publicId: reportId });
        if (!report) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                msg: "Report not found!",
            });
        }
        const newLead= new Lead({
            email,
            company,
            role,
            teamSize,
            reportId
        })
        await newLead.save()
        if(sendEmail){
            await sendAuditEmail(
            email,
            reportId,
            report.estimatedMonthlySavings
        );
        } 
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            newLead,
            emailSent: Boolean(sendEmail),
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Error Saving details.Please try Again!"
        })
        return;
    }
}

export default createLead;