import { Router } from "express";
import authController from "../controllers/auth.mjs";
import { registerValidation, loginValidation } from "../utils/validations.mjs";
import notFoundHandler from "../middlewares/errors/notFoundHandler.mjs";
import passport from "passport";
import '../strategies/localStrategy.mjs';

const { register, login, logout, deleteUser } = authController;

const router = Router();
router.post('/register', registerValidation, register);
router.post('/logout', logout);
router.post('/delete/:id', deleteUser);
router.post('/login', loginValidation, passport.authenticate('local'), login);
router.use(notFoundHandler);

export default router;