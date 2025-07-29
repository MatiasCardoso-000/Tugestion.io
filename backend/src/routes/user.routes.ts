import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema";
import { UserController } from "../controllers/user.controllers";
import { loginSchema, registerSchema } from "../schemas/auth.schemas";
import { validateToken } from "../middleware/validateToken";


export const router = Router();

router.post(
  "/register",
  validateSchema(registerSchema),
  UserController.register
);
router.post(
  "/login",
  validateSchema(loginSchema),

  UserController.login
);
router.get("/user/:uid", validateToken, UserController.getUser);

router.post('/logout', UserController.logout)
router.post('/refresh-token',UserController.refreshTokenController )