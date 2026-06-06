import { Router } from "express";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/testimonialController";

const router = Router();

router.get("/", getTestimonials);
router.post("/", createTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id/:menuId", deleteTestimonial);

export default router;
