import STATUS_CODES from "../utils/StatusCodes.js";

const validateReport=(req,res,next)=>{
    const {tools, teamSize, useCase} =req.body;
    if(!tools || !Array.isArray(tools) || tools.length<=0){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            msg: "Enter valid tools!"
        })
    }
    else if(!teamSize || teamSize<=0){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            msg: "Enter valid team size!"
        })
    }
    else if(!useCase){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            msg: "Enter a valid use case!"
        })
    }

    for(const tool of tools){
        if(!tool.toolName || !tool.plan || !tool.seats || !tool.monthlySpend){
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                msg: "Enter valid tools!"
            })
        }
    }
    next();
}

export default validateReport