import { Router } from "express";
import { autenticateUser, createUser, forgotPassword, resetPassword } from "../controllers/userController";

const router = Router();

router.post("/", createUser);
router.post("/auth", autenticateUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;