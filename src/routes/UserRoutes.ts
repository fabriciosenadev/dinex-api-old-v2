import { Router } from "express";

// Controllers
import { UserController } from "../controllers/UserController";


// instance to each controller
const userController = new UserController();

// implemented routes using prefix /test
const userRoutes = Router();

userRoutes.post('/create', userController.create);

export { userRoutes };