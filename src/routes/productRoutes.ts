import { Router } from "express";
import { getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController";

const router = Router();

router.post("/all", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);

router.delete("/:id/:menuId", deleteProduct);

export default router;