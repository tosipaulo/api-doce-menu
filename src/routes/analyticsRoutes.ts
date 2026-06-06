import { Router } from "express";
import { createAnalytics, getAnalytics } from "../controllers/analyticsController";

const router = Router();

router.get("/", getAnalytics);
router.post("/", createAnalytics);

export default router;

