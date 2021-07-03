import { Router } from "express";

// Controllers
import { TestController } from "../controllers/TestController";


// instance to each controller
const testController = new TestController();

// implemented routes using prefix /test
const testRoutes = Router();

if (process.env.NODE_ENV === 'dev') {
    testRoutes.get('/', testController.firstGet);
    testRoutes.post('/encrypt', testController.encrypt); // route to be used in dev
}

export { testRoutes };