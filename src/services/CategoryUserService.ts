import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { IsCustom } from "../models/enums/IsCustom";
import { CategoryRepository } from "../repository/CategoryRepository";
import { CategoryUserRepository } from "../repository/CategoryUserRepository";

export class CategoryUserService {
    public static async addStandardCategoriesToUser(userId: string) {
        try {
            const categoryUserRepository = getCustomRepository(CategoryUserRepository);
            const categoryRepository = getCustomRepository(CategoryRepository);

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
            throw new AppError(error);
        }

    }
}