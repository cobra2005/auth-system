import { Router } from "express";
import authController from "../controllers/auth.mjs";

const router = Router();
const { profile } = authController;

router.get('/profile', profile);

export default router;