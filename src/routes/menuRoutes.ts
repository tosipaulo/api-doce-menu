import { Router } from "express";
import { getMenu, createMenu, updateMenu, deleteMenu } from "../controllers/menuController";

const router = Router();

router.post("/", createMenu);
router.get("/", getMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;