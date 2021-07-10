import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import { Cryptography } from "../utils/Cryptography";
import { AppError } from "../errors/AppError";
import { WebToken } from "../utils/WebToken";

export class AuthService {
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
        return await WebToken.generate(id);
    }

    private static async userRepository() {
        return getCustomRepository(UserRepository);
    }
}

