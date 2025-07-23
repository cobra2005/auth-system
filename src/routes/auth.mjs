import { Router } from "express";
import authController from "../controllers/auth.mjs";
import { registerValidation, loginValidation } from "../utils/validations.mjs";
import notFoundHandler from "../middlewares/errors/notFoundHandler.mjs";

const { register, login, logout, deleteUser } = authController;

const router = Router();
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', logout);
router.post('/delete/:id', deleteUser);
router.use(notFoundHandler);

export default router;