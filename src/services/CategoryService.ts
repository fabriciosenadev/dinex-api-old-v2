import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { Category } from "../models/Category";
import { IsCustom } from "../models/enums/IsCustom";
import { CategoryRepository } from "../repository/CategoryRepository";
import { CategoryUserService } from "./CategoryUserService";

export class CategoryService {
    public static async createAsync(category: Category, userId: string) {
        // this service works with candidate to category, even here category still does not exists
        const categoryRepository = await this.categoryRepository();
        let categoryCandidate;
        
        const alreadyExists = await categoryRepository.find({
            name: category.name
        });
        
        if (alreadyExists.length === 0) {
            category.is_custom = IsCustom.Yes;
            categoryCandidate = await categoryRepository.create(category);
            await categoryRepository.save(categoryCandidate);
        }
        else {
            categoryCandidate = alreadyExists;
        }
        const newCategory = categoryCandidate;

        await this.addCategoryRelationToUser(newCategory.id, userId);

        return newCategory;
    }

    public static async deleteAsync(category: Category) {
        //TODO: need to implement delete service
        throw new AppError("Need to be implemented", 500);
    }

    private static async categoryRepository() {
        return getCustomRepository(CategoryRepository);
    }

    private static async addCategoryRelationToUser(categoryId: number, userId: string) {
        CategoryUserService.addCategoryRelationToUser(categoryId, userId);
    }
}