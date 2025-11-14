import { Router } from "express";
import { getCategory, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController";

const router = Router();

router.post("/all", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id/:menuId", deleteCategory);

export default router;

