import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import { CategoryUserService } from "./CategoryUserService";
import { User } from "../models/User";

export class UserService {
    public static async createAsync(user: User) {
        const userRepository = await this.userRepository();

        const newUser = await userRepository.create(user);
        await userRepository.save(newUser);

        this.addStandardCategoriesToUser(newUser.id);

        return newUser;
    }

    private static async addStandardCategoriesToUser(userId: string) {
        CategoryUserService.addStandardCategoriesToUser(userId);
    }

    private static async userRepository() {
        return getCustomRepository(UserRepository);
    }
}

