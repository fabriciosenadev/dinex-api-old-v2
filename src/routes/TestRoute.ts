import { Router, Request, Response } from "express";

// Controllers
import { TestController } from "../controllers/TestController";


// instance to each controller
const testController = new TestController();

// implemented routes using prefix /test
const testRouter = Router();

testRouter.get('/', testController.firstGet);

export { testRouter };