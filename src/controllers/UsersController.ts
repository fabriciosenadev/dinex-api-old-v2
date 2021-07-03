import { Request, Response } from 'express';
import { AppError } from "../errors/AppError";
import { Cryptography } from '../utils/Cryptography';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

export class UsersController {
    private user: User;

    public async create(request: Request, response: Response) {
        try {
            this.user = request.body;
            const newUser = await UserService.createAsync(this.user);
            return response.json({ user: newUser });
        } catch (error) {
            console.log(error);
            throw new AppError(error);
        }
    }

    public async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const token = await UserService.loginAsync(email, password);
            return response.json({ token });
        } catch (error) {
            console.log(error);
            throw new AppError(error);
        }
    }
}
