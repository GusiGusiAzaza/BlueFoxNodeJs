import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import passport from 'passport';

import mongo from './db/mongo';

import { validateJwtMiddleware } from './middleware/validateJwt';

import GenericHttpError from './model/HttpError';
import ApplicationException from './model/ApplicationException';

// routes
import publicRoutes from './routes/public';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(responseTime((req: Request, res: Response, time: number) => console.log(`${req.url} - ${time}ms`)));

app.use('', publicRoutes);
app.use('/auth', authRoutes);
app.use('/users', validateJwtMiddleware, usersRoutes);

// Handle errors.
app.use((err: ApplicationException, req: Request, res: Response, next: NextFunction) => {
    console.log('Error', err);
    let status = 500;

    if (err instanceof GenericHttpError) {
        status = (err as GenericHttpError).status;
    }

    res.status(status);
    res.json({ code: err.code, message: err.message });
});

mongo()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on ${port}`);
        });
    })
    .catch(() => {
        console.error('mongoDB connection error');
    });
