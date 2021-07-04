import { Router } from "express";

import { UsersController } from "../controllers/UsersController";
import { UserMiddleware } from "../middlewares/UserMiddleware";

const userMiddleware = new UserMiddleware();

const usersController = new UsersController();

const userRoutes = Router();

userRoutes.post(
    '/',
    userMiddleware.validateNewUser,
    usersController.create
);
// userRoutes.get('/:user_id/', usersController.get);
// userRoutes.put('/:user_id/', usersController.update);

userRoutes.post(
    '/login/',
    userMiddleware.validateLogin,
    usersController.login
);
// userRoutes.post('/forgot_pass/', usersController.forgotPass);
// userRoutes.post('/reset_pass/', usersController.resetPass);
// userRoutes.post('/change_pass/', usersController.changePass);

export { userRoutes };