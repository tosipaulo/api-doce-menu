import { Router } from "express";
import { getRestaurantSettings, createRestaurantSettings, updateRestaurantSettings, deleteRestaurantSettings } from "../controllers/restaurantController";

const router = Router();

router.post("/", createRestaurantSettings);
router.get("/", getRestaurantSettings);
router.put("/:id", updateRestaurantSettings);
router.delete("/:id", deleteRestaurantSettings);

export default router;