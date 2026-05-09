import STATUS_CODES from "../utils/StatusCodes.js";

const honeyPot=(req,res,next)=>{
    try{
        const website=req.body.website;

        if(!website){
            next();
        }else{
            res.status(STATUS_CODES.BAD_REQUEST).json({
                msg: "Request Rejected!"
            })
            return;
        }
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: "Error Occured!Please try again"
        })
        return;
    }
}

export default honeyPot