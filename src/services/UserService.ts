import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import { CategoryUserService } from "./CategoryUserService";
import { User } from "../models/User";
import { Cryptography } from "../utils/Cryptography";
import { AppError } from "../errors/AppError";
import * as jwt from "jsonwebtoken";

export class UserService {
    public static async createAsync(user: User) {
        const userRepository = await this.userRepository();

        const newUser = await userRepository.create(user);
        await userRepository.save(newUser);

        this.addStandardCategoriesToUser(newUser.id);

        return newUser;
    }

    public static async loginAsync(email: string, password: string) {
        const userRepository = await this.userRepository();

        const user = await userRepository.findOne({
            email
        });

        if (!user) {
            throw new AppError("Usuário não localizado", 401);
        }

        const decryptedPassword = await Cryptography.doDecrypt(user.password);
        const decryptedReceivedPass = await Cryptography.doDecrypt(password);

        if (decryptedPassword !== decryptedReceivedPass) {
            throw new AppError("Usuário ou senha está/ estão incorreto(s)", 401);
        }

        const { id } = user;
        return this.generateToken(id);
    }

    private static async addStandardCategoriesToUser(userId: string) {
        CategoryUserService.addStandardCategoriesToUser(userId);
    }

    private static async userRepository() {
        return getCustomRepository(UserRepository);
    }

    private static async generateToken(id: string) {
        return jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 3600 * 24 // expires in a day
        });
    }
}

