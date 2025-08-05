import { Router } from "express";
import { createMailing} from "../controllers/mailingController";

const router = Router();

router.post("/", createMailing);

export default router;