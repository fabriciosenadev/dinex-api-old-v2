import { Router } from "express";

import { CategoriesController } from "../controllers/CategoriesController";
import { CategoryMiddleware } from "../middlewares/CategoryMiddleware";


const categoryRoutes = Router();

const categoryMiddleware = new CategoryMiddleware();

const categoriesController = new CategoriesController();

categoryRoutes.post(
    '/', 
    categoryMiddleware.validateNewCategory,
    categoriesController.create
);
// categoryRoutes.put('/:category_id', categoriesController.delete);

export { categoryRoutes };