import express from "express";
import { submitEnquiry } from "../controllers/controller.js";

const router = express.Router();

router.post("/contact", submitEnquiry);

export default router;