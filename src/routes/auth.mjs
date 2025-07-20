import { Router } from "express";
import authController from "../controllers/auth.mjs";
import { checkSchema } from "express-validator";
import { registerValidationSchema, loginValidationSchema } from "../utils/validationSchema.mjs";
import resolveIndexByUserId from "../middlewares/resolveIndexByUserId.mjs";

const { register, login, profiles, profile } = authController;

const router = Router();
router.get('/profiles', profiles);
router.get('/profile/:id', resolveIndexByUserId, profile)
router.post('/register', checkSchema(registerValidationSchema), register);
router.post('/login', checkSchema(loginValidationSchema), login)

export default router;