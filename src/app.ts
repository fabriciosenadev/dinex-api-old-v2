import 'reflect-metadata'; // used by database
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

//TODO: need to be implemented to use database
// import createConnection from './database';

import { AppError } from './errors/AppError';
import { appRouter } from './routes';

// instance of all express app
const app = express();

// parse transactions to json
app.use(express.json());

// implements all routes of app
app.use(appRouter);

// middleware to raise exceptions
app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            error: err.message,
        });
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`
    });
});

export { app };