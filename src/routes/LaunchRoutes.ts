import { Router } from "express";
import { LaunchesController } from "../controllers/LaunchesController";
import { LaunchMiddleware } from "../middlewares/LaunchMiddleware";

const launchMiddleware = new LaunchMiddleware();

const launchesController = new LaunchesController();

const launchRoutes = Router();

launchRoutes.post(
    '/',
    launchMiddleware.validateNewLaunch,
    launchesController.create
);
// launchRoutes.post('/:launch_id', );
// launchRoutes.post('/:launch_id', );

export { launchRoutes };