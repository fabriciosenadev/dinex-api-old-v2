import express from 'express';

//import here all individual routes
import { testRoutes } from './routes/TestRoutes';
import { userRoutes } from './routes/UserRoutes';

// all routes to be used by app
const appRouter = express();

// implemented routes by prefix
appRouter.use('/test', testRoutes);
appRouter.use('/user', userRoutes);
// appRouter.use('/launch', launchRoutes);
// appRouter.use('/category', categoryRoutes);
// appRouter.use('/system', systemRoutes);

export { appRouter };

