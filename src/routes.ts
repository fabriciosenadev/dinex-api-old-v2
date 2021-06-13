import express from 'express';

//import here all individual routes
import { testRouter } from './routes/TestRoute';

// all routes to be used by app
const appRouter = express();

// implemented routes by prefix
appRouter.use('/test', testRouter);

export { appRouter };

