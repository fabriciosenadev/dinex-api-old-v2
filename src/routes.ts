import express from 'express';

//import here all individual routes
import { testRoutes } from './routes/_TestRoutes';
import { userRoutes } from './routes/UserRoutes';
import { categoryRoutes } from './routes/CategoryRoutes';
import { authRoutes } from './routes/AuthRoutes';

// all routes to be used by app
const appRouter = express();

// implemented routes by prefix
appRouter.use('/test', testRoutes);
appRouter.use('/login', authRoutes);
appRouter.use('/users', userRoutes);
appRouter.use('/categories', categoryRoutes);
// appRouter.use('/launches', launchRoutes);
// appRouter.use('/system', systemRoutes);

export { appRouter };

