import { Router } from "express";

import { UsersController } from "../controllers/UsersController";

const usersController = new UsersController();

const userRoutes = Router();

userRoutes.post('/', usersController.create);
// userRoutes.get('/:user_id/', usersController.get);
// userRoutes.put('/:user_id/', usersController.update);

export { userRoutes };