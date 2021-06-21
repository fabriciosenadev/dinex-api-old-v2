import { Request, Response } from 'express';
import { AppError } from "../errors/AppError";
import "../Settings";
import { Cryptography } from '../utils/Cryptography';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { IUserService } from '../services/interfaces/IUSerService';

class UsersController {
    private user: User;
    private readonly userService: IUserService;

    public async create(request: Request, response: Response) {
        try {
            this.user = request.body;
            const passEncrypted = await Cryptography.doEncrypt(this.user.pass);

            this.user.pass = passEncrypted;
            let u = await this.userService.createAsync(this.user);

            return response.json({ user: u });
        } catch (error) {
            console.log(error);

            if (error.message) {
                throw new AppError(error);
            }
            else {
                throw new AppError("invalid try to create a new user");
            }
        }
    }
}

export { UsersController };