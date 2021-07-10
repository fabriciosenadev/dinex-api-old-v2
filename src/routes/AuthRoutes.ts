import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const authMiddleware = new AuthMiddleware();

const authController = new AuthController();

const authRoutes = Router();

authRoutes.post(
    '/',
    authMiddleware.validateLogin,
    authController.login
);

export { authRoutes };