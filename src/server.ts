import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import cors from 'cors';
import passport from 'passport';

import mongo from './db/mongo';

import { validateJwtMiddleware } from './middleware/validateJwt';

import GenericHttpError from './model/HttpError';
import ApplicationException from './model/ApplicationException';

// routes
import publicRoutes from './routes/public';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import themesRoutes from './routes/themes';
import testsRoutes from './routes/tests';
import questionsRoutes from './routes/questions';
// import answersRoutes from './routes/answers';
// import userAnswersRoutes from './routes/userAnswers';
// import testResultsRoutes from './routes/userAnswers';

const port = process.env.PORT || 8080;

const app = express();
// Health Check endpoint
app.get('/status', (req, res) => {
    res.status(200).end();
});

// Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// It shows the real origin IP in the heroku or Cloudwatch logs
app.enable('trust proxy');

// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(responseTime((req: Request, res: Response, time: number) => console.log(`${req.url} - ${time}ms`)));

app.use('', publicRoutes);
app.use('/auth', authRoutes);
app.use('/users', validateJwtMiddleware, usersRoutes);
app.use('/themes', validateJwtMiddleware, themesRoutes);
app.use('/tests', validateJwtMiddleware, testsRoutes);
app.use('/questions', validateJwtMiddleware, questionsRoutes);
// app.use('/answers', validateJwtMiddleware, answersRoutes);
// app.use('/userAnswers', validateJwtMiddleware, userAnswersRoutes);
// app.use('/testResults', validateJwtMiddleware, testResultsRoutes);

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
