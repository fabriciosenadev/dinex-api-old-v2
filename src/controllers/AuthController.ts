import { Request, Response } from 'express';
import { AppError } from "../errors/AppError";
import { AuthService } from '../services/AuthService';

export class AuthController {
    public async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const token = await AuthService.loginAsync(email, password);
            return response.json({ token });
        } catch (error) {
            console.log(error);
            throw new AppError(error.message, 401);
        }
    }
}