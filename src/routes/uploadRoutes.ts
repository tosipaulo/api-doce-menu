import { Router } from "express";
import multer from 'multer';

import { uploadImage } from "../controllers/uploadController";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post("/", upload.single("image"), uploadImage);

export default router;