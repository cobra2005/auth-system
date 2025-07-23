import { Router } from "express";
import adminRouter from './admin.mjs';
import userRouter from './user.mjs';
import authRouter from './auth.mjs';
import { checkRole } from "../middlewares/checkRole.mjs";

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/admin', checkRole, adminRouter);

export default router;