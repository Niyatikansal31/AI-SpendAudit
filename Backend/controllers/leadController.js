import Lead from "../models/Lead.js"
import STATUS_CODES from "../utils/StatusCodes.js";

const createLead=async(req,res)=>{
    const { email, company, role, teamSize, reportId } = req.body;
    
    if(!email || !reportId){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please enter complete details!"
        })
        return;
    }

    try{
        const newLead= new Lead({
            email,
            company,
            role,
            teamSize,
            reportId
        })
        await newLead.save()
        res.status(STATUS_CODES.CREATED).json({
            newLead
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: "Error Saving details.Please try Again!"
        })
        return;
    }
}

export default createLead;