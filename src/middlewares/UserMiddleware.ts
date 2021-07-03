import { Request, Response, NextFunction } from "express";
import { check, body, validationResult } from "express-validator";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repository/UserRepository";
import { Cryptography } from "../utils/Cryptography";

export class UserMiddleware {
    public async validateUserData(request: Request, response: Response, _next: NextFunction) {

        await check('email')
            .exists()
            .withMessage('E-mail é obrigatório')
            .isEmail()
            .withMessage('E-mail não é válido')
            .run(request);

        await body('password').custom(async (value) => {
            const decryptedPassword = await Cryptography.doDecrypt(value);
            if (decryptedPassword.length < 6)
                throw new Error('Senha deve ter pelo meno 6 caracteres');

            return true;
        }).run(request);

        if (!request.originalUrl.includes('login')) {
            await body('verifyPass').custom(async (value, { req }) => {
                const decryptedVerifyPass = await Cryptography.doDecrypt(value);
                const decryptedPassword = await Cryptography.doDecrypt(req.body.password);
                if (decryptedVerifyPass !== decryptedPassword)
                    throw new Error('Senha e confirmação devem ser iguais');

                return true;
            }).run(request);

            await check('full_name')
                .exists()
                .withMessage('Nome completo é obrigatório')
                .isLength({ min: 10 })
                .withMessage('Nome muito curto, por favor informe nome completo')
                .run(request);
        }

        const result = validationResult(request);
        if (!result.isEmpty()) {
            const errors = result.array();
            const msg = errors[0].msg;
            throw new AppError(msg);
        }

        const userRepository = getCustomRepository(UserRepository);
        const hasUser = await userRepository.findOne({ email: request.body.email });
        if (hasUser)
            throw new AppError("Usuário ja cadastrado!");

        _next();
    }
}