import { User } from "../models/User";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import { AppError } from "../errors/AppError";

class UserService {
    public static async createAsync(user: User) {
        const userRepository = getCustomRepository(UserRepository);

        const hasUser = await userRepository.findOne({ email: user.email });
        if (hasUser)
            throw new AppError("User already exists!");

        const newUser = userRepository.create({
            full_name: user.full_name,
            email: user.email,
            password: user.password
        });
        userRepository.save(newUser);

        return newUser;
    }
}

export { UserService };