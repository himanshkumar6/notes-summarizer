import { summarizeText } from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/summarize", summarizeText);

export default router;
