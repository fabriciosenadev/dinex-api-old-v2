import { Router } from "express";

// Controllers
import { TestController } from "../controllers/TestController";


// instance to each controller
const testController = new TestController();

// implemented routes using prefix /test
const testRoutes = Router();

testRoutes.get('/', testController.firstGet);

export { testRoutes };