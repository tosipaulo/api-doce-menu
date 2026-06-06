import { Router } from "express";
import { getHowItWorks, createHowItWorks, updateHowItWorks, deleteHowItWorks } from "../controllers/howItWorksController";

const router = Router();

router.get("/", getHowItWorks);
router.post("/", createHowItWorks);
router.put("/:id", updateHowItWorks);
router.delete("/:id/:menuId", deleteHowItWorks);

export default router;
