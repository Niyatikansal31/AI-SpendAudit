import express from "express"
import createLead from "../controllers/leadController.js";
import honeyPot from "../middleware/honeypot.js";
const router=express.Router();

router.post('/',honeyPot,createLead)

const LeadRoute=router
export default LeadRoute