import { Router } from "express";
import { checkSchema } from "express-validator";
import authController from "../controllers/auth.mjs";
import { checkRole } from "../middlewares/checkRole.mjs";
import { registerValidationSchema, loginValidationSchema } from "../utils/validationSchema.mjs";
import adminRouter from "./admin.mjs";
import userRouter from "./user.mjs";

const { register, login, logout, deleteUser } = authController;

const router = Router();
router.post('/register', checkSchema(registerValidationSchema), register);
router.post('/login', checkSchema(loginValidationSchema), login);
router.post('/logout', logout);
router.post('/delete/:id', deleteUser);
router.use('/admin', checkRole, adminRouter);
router.use('/user', userRouter);

export default router;