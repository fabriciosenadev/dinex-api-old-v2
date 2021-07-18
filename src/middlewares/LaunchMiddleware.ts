import { NextFunction, Request, Response } from "express";
import { body, check, validationResult } from "express-validator";
import moment from "moment";
import { AppError } from "../errors/AppError";
import { PayMethod } from "../models/enums/PayMethod";
import { WebToken } from "../utils/WebToken";

export class LaunchMiddleware {
    public async validateNewLaunch(request: Request, response: Response, _next: NextFunction) {
        const { authorization } = request.headers;
        request.body.userId = await WebToken.decodeToUserId(authorization);

        const { launch, payMethodLaunch } = request.body;
        const isDate = moment(launch.date, 'YYYY-MM-DD', true).isValid();

        if (!isDate)
            throw new AppError("Data é obrigatória, por favor verifique se está preenchido");


        await check('launch.value')
            .exists()
            .withMessage('Valor é obrigatório')
            .isFloat({ gt: 0.0 })
            .withMessage('Valor não é válido')
            .run(request);

        await check('launch.category_id')
            .exists()
            .withMessage("Categoria é obrigatória")
            .isInt({ gt: 0 })
            .withMessage('Categoria não é válida')
            .run(request);

        if (payMethodLaunch !== undefined) {
            await body('payMethodLaunch.pay_method').custom(async (value) => {
                if (value !== PayMethod.Cash && value !== PayMethod.Debit && value !== PayMethod.Credit)
                    throw new AppError('Informe uma Forma de pagamento');

                return true;
            }).run(request);
        }

        const result = validationResult(request);
        if (!result.isEmpty()) {
            const errors = result.array();
            const msg = errors[0].msg;
            throw new AppError(msg);
        }

        _next();
    }
}