import { Router } from "express";
import adminController from "../controllers/admin.mjs";

const router = Router();
const { users, dashboard } = adminController;

router.get('/dashboard', dashboard);
router.get('/users', users);

export default router;