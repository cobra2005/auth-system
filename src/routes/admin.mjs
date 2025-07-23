import { Router } from "express";
import adminController from "../controllers/admin.mjs";
import notFoundHandler from "../middlewares/errors/notFoundHandler.mjs";

const router = Router();
const { users, dashboard } = adminController;

router.get('/dashboard', dashboard);
router.get('/users', users);
router.use(notFoundHandler);

export default router;