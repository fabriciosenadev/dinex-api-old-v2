import { Request, Response } from 'express';
import { AppError } from "../errors/AppError";
import "../Settings";
import { Cryptography } from '../utils/Cryptography';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

export class UsersController {
    private user: User;

    public async create(request: Request, response: Response) {
        try {
            this.user = request.body;

            const passEncrypted = await Cryptography.doEncrypt(this.user.password);
            this.user.password = passEncrypted;

            const newUser = await UserService.createAsync(this.user);

            return response.json({ user: newUser });
        } catch (error) {
            console.log(error);
            
            throw new AppError(error);
        }
    }
}
