import { Request, Response } from 'express';
import { AppError } from "../errors/AppError";
import { Cryptography } from '../utils/Cryptography';

/**  FIRST TEST
 * basic structure to be implemented on  any other controller
*/

class TestController {
    async firstGet(request: Request, response: Response) {
        try {
            response.json("kkk");
        } catch (error) {
            throw new AppError("first error got");
        }
    }
    async encrypt(request: Request, response: Response) {
        try {
            const { pass1, pass2 } = request.body;

            const encryptPass1 = await Cryptography.doEncrypt(pass1);
            const encryptPass2 = await Cryptography.doEncrypt(pass2);

            response.json({ encryptPass1, encryptPass2 });
        } catch (error) {
            throw new AppError(error.message, error.statusCode);
        }
    }
}

export { TestController };