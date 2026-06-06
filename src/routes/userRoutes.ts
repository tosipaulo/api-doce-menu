import { Router } from "express";
import { autenticateUser, changePassword, createUser, forgotPassword, getMe, logoutUser, resetPassword } from "../controllers/userController";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";
import { verifyUser } from "../middlewares/userMiddleware";

const router = Router();

router.post("/", createUser);
router.post("/auth", autenticateUser);
router.post("/logout", logoutUser);
router.get("/me", tokenMiddleware, verifyUser, getMe);
router.patch("/password", tokenMiddleware, verifyUser, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;