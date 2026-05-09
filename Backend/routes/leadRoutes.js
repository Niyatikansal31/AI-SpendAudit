import express from "express"
import createLead from "../controllers/leadController.js";
const router=express.Router();

router.post('/',createLead)

const LeadRoute=router
export default LeadRoute