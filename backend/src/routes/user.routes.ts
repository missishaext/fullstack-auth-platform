import { Router } from "express";
import {getProfile, getUsers} from "../controllers/user.controller";
import { authorizeAdmin } from "../middleware/admin.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", authenticate, getProfile);
router.get("/list",authenticate,authorizeAdmin,getUsers);

export default router;