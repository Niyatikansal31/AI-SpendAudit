import express from "express"
import { createReport, getReportById } from "../controllers/reportController.js";
const router=express.Router();

router.post('/',createReport)
router.get('/:id',getReportById)

const ReportRoute=router
export default ReportRoute