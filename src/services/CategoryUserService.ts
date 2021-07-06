import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { IsCustom } from "../models/enums/IsCustom";
import { CategoryRepository } from "../repository/CategoryRepository";
import { CategoryUserRepository } from "../repository/CategoryUserRepository";

export class CategoryUserService {
    public static async addStandardCategoriesToUser(userId: string) {
        try {
            const categoryUserRepository = await this.categoryUserRepository();
            const categoryRepository = await this.categoryRepository();

            let arrCategories = await categoryRepository.find({
                is_custom: Number(IsCustom.No)
            });
            arrCategories.forEach(async (category) => {
                const newCategoryUser = await categoryUserRepository.create({
                    category_id: category.id,
                    user_id: userId,
                });
                await categoryUserRepository.save(newCategoryUser);
            });
        }
        catch (error) {
            console.log(error);
            throw new AppError("Ocorreu um erro interno: " + error, 500);
        }

    }

    public static async addCategoryRelationToUser(categoryId: number, userId: string) {
        try {
            const categoryUserRepository = await this.categoryUserRepository();
            const newRelation = await categoryUserRepository.create({
                category_id: categoryId,
                user_id: userId
            })
            console.log(newRelation);

            await categoryUserRepository.save(newRelation);
        } catch (error) {
            console.log(error);
            throw new AppError("Ocorreu um erro interno: " + error, 500);
        }
    }

    private static async categoryUserRepository() {
        return getCustomRepository(CategoryUserRepository);
    }

    private static async categoryRepository() {
        return getCustomRepository(CategoryRepository);
    }
}