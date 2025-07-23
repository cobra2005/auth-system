import { Router } from "express";
import authController from "../controllers/auth.mjs";
import notFoundHandler from "../middlewares/errors/notFoundHandler.mjs";

const router = Router();
const { profile } = authController;

router.get('/profile', profile);
router.use(notFoundHandler);

export default router;