import { NextFunction, Request, Response } from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { AppError } from "../errors/AppError";
import { Applicable } from "../models/enums/Applicable";
import { WebToken } from "../utils/WebToken";


export class CategoryMiddleware {
    public async validateNewCategory(request: Request, response: Response, _next: NextFunction) {
        await check('category.name')
            .exists()
            .withMessage('categoria é obrigatória')
            .isLength({ min: 4 })
            .withMessage('nome muito curto')
            .run(request);

        await body('category.applicable').custom(async (value) => {
            if (value !== Applicable.In && value !== Applicable.Out)
                throw new Error('Informe a aplicabilidade da categoria');

            return true;
        }).run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            const errors = result.array();
            const msg = errors[0].msg;
            throw new AppError(msg);
        }

        const { authorization } = request.headers;
        if (!authorization)
            throw new AppError("No token provided", 401);

        request.body.userId = await WebToken.decodeToUserId(authorization);

        _next();
    }

    public async prepareToDelete(request: Request, response: Response, _next: NextFunction) {
        const { authorization } = request.headers;        
        if (!authorization)
            throw new AppError("No token provided", 401);

        request.body.userId = await WebToken.decodeToUserId(authorization);

        _next();
    }
}