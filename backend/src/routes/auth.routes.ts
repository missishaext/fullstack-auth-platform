import { Router } from "express";
import {signup, signin} from "../controllers/auth.controller";
import {authRateLimiter} from "../middleware/rate-limit.middleware";
import {requireJsonContentType} from "../middleware/content-type.middleware";

const router = Router();

router.post(
  "/signup",
  requireJsonContentType,
  authRateLimiter,
  signup
);

router.post(
  "/signin",
  requireJsonContentType,
  authRateLimiter,
  signin
);

export default router;