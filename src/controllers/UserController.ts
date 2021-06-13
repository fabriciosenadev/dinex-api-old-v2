import { Request, Response } from 'express';
import { AppError } from "../errors/AppError";
import * as crypto from "crypto-js";
import "../Settings";

class UserController {
    // TODO: need to create a service to migrate rules from here to there
    public async create(request: Request, response: Response) {
        // fix to call internal functions, this. didn't work
        const uc = new UserController();

        try {
            const { full_name, email, password } = request.body;
            console.log({ full_name, email, password });
            const passEncrypted = await uc.encrypt(password);
            console.log({ full_name, email, passEncrypted });
            return response.json({ full_name, email, passEncrypted });
        } catch (error) {
            console.log(error);

            throw new AppError("invalid try to create a new user");
        }
    }
    private async encrypt(pass: string) {
        try {
            const encrypted = crypto.AES.encrypt(
                pass.trim(),
                process.env.PASS_KEY
            ).toString()

            return encrypted;
        } catch (error) {
            throw new AppError("Error to encrypt password");
        }
    }
}

export { UserController };