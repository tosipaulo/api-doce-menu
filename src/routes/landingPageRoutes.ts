import { Router } from "express";
import { getHomePage } from "../controllers/landingPageController";

const router = Router();

router.get("/", getHomePage);

export default router;