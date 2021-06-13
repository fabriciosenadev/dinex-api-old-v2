import { Request, Response } from 'express';
import { AppError } from "../errors/AppError";

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
}

export { TestController };