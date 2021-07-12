import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { Launch } from "../models/Launch";
import { PayMethodLaunch } from "../models/PayMethodLaunch";
import { LaunchService } from "../services/LaunchService";


export class LaunchesController {
    private launch: Launch;
    private payMethodLaunch: PayMethodLaunch;

    public async create(request: Request, response: Response) {
        try {
            const { launch, payMethodLaunch, userId } = request.body;
            this.launch = launch;
            this.launch.user_id = userId
            this.payMethodLaunch = payMethodLaunch;
            
            const newLaunch = await LaunchService.createAsync(this.launch, this.payMethodLaunch);
            return response.status(201).json(newLaunch);
        } catch (error) {
            console.log(error);
            throw new AppError(error);
        }
    }

    public async update(request: Request, response: Response) {
        throw new AppError("Need to implement", 500);
    }

    public async delete(request: Request, response: Response) {
        throw new AppError("Need to implement", 500);
    }
}