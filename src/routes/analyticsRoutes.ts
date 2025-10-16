import { Router } from "express";
import { createAnalytics } from "../controllers/analyticsController";

const router = Router();

// Rota pública para registrar eventos de analytics
router.post("/", createAnalytics);

export default router;

