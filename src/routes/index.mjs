import { Router } from "express";
import adminRouter from './admin.mjs';
import userRouter from './user.mjs';
import authRouter from './auth.mjs';
import { checkRole } from "../middlewares/checkRole.mjs";
import { registerValidate } from "../middlewares/validate.mjs";
import authController from '../controllers/auth.mjs'

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/admin', checkRole, adminRouter);
router.use('/register', registerValidate, authController.register);

export default router;