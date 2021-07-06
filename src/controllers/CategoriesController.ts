import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { Category } from "../models/Category";
import { CategoryService } from "../services/CategoryService";

export class CategoriesController {
    private category: Category;

    public async create(request: Request, response: Response) {
        //TODO: need to design the workflow to create new category
        try {
            const { category, userId } = request.body;
            this.category = category;
            const newCategory = await CategoryService.createAsync(this.category, userId);
            return response.status(201).json({ category: newCategory });
        } catch (error) {
            console.log(error);
            throw new AppError(error);
        }
    }
    public async delete(request: Request, response: Response) {
        try {
            this.category = request.body;
            const newCategory = await CategoryService.deleteAsync(this.category);
            return response.status(201).json({ category: newCategory });
        } catch (error) {
            console.log(error);
            throw new AppError(error);
        }
    }
}