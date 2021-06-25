import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repository/UserRepository";
import { CategoryUserService } from "./CategoryUserService";
import { User } from "../models/User";

export class UserService {
    public static async createAsync(user: User) {
        const userRepository = getCustomRepository(UserRepository);

        const hasUser = await userRepository.findOne({ email: user.email });
        if (hasUser)
            throw new AppError("User already exists!");

        const newUser = await userRepository.create({
            full_name: user.full_name,
            email: user.email,
            password: user.password
        });
        await userRepository.save(newUser);

        UserService.addStandardCategoriesToUser(newUser.id);

        return newUser;
    }

    private static async addStandardCategoriesToUser(userId: string) {
        CategoryUserService.addStandardCategoriesToUser(userId);
    }
}
