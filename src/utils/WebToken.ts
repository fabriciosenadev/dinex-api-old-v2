import * as jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export class WebToken {
    public static async decodeToUserId(authorization: string) {
        await this.verifyAuthorization(authorization);

        const [, token] = authorization.split(' ');

        return jwt.verify(
            token,
            process.env.SECRET,
            (error, decoded) => {
                if (error)
                    throw new AppError(error, 500);

                return decoded.id;
            });
    }

    public static async generate(id: string) {
        return jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 3600 * 24 // expires in a day
        });
    }

    private static async verifyAuthorization(token: string) {
        if (!token)
            throw new AppError("No token provided", 401);
    }
}