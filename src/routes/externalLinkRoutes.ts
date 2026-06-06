import { Router } from "express";
import { getExternalLinks, createExternalLink, updateExternalLink, deleteExternalLink } from "../controllers/externalLinkController";

const router = Router();

router.get("/", getExternalLinks);
router.post("/", createExternalLink);
router.put("/:id", updateExternalLink);
router.delete("/:id/:menuId", deleteExternalLink);

export default router;
