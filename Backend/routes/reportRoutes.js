import express from "express"
import { createReport, getReportById } from "../controllers/reportController.js";
import validateReport from "../middleware/validateReport.js";
const router=express.Router();

router.post('/',validateReport,createReport)
router.get('/:id',getReportById)

const ReportRoute=router
export default ReportRoute