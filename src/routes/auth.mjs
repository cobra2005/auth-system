import { Router } from "express";
import authController from "../controllers/auth.mjs";
import notFoundHandler from "../middlewares/errors/notFoundHandler.mjs";
import passport from "passport";
import '../strategies/localStrategy.mjs';
import { loginValidate } from "../middlewares/validate.mjs";

const { login, logout, deleteUser } = authController;

const router = Router();
router.post('/login', loginValidate, passport.authenticate('local'), login);
router.post('/logout', logout);
router.post('/delete/:id', deleteUser);
router.use(notFoundHandler);

export default router;