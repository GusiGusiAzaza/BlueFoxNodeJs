import passport from 'passport';
import '../middleware/auth';
import { NextFunction, Request, Response } from 'express';
import authConfig from '../config/auth';
import AuthSignupResponse from '../model/AuthSignupResponse';
import AuthLoginResponse from '../model/AuthLoginResponse';
import service from '../service/AuthService';
import { AuthenticationError } from '../model/HttpError';
import { Auth } from '../entity/Auth';

export const signupAuth = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('signup',
        {
            session: false,
            // Optional
            successRedirect: '/ping', // redirect if success
            failureRedirect: '/signup' // redirect if there is an error
        },
        (err, user) => {
            if (err || !user) {
                return next(err);
            }
            return res.json(new AuthSignupResponse('Signup successful', user.id));
        })(req, res, next);
};

export const loginAuth = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('login', (err, user) => {
        if (err || !user) {
            return next(err);
        }
        req.login(user, { session: false }, async (error) => {
            if (error) {
                return next(error);
            }
            const body = { _id: user.id.toString(), _isAdmin: user.isAdmin };
            // Creates token
            service.generateToken(body).then((token) => res.json(
                new AuthLoginResponse('Login successful', user.id, user.isAdmin, token)
            ));
        });
    })(req, res, next);
};

export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', { session: false }, (err: any, user: Auth) => {
        if (err || !user) {
            next(new AuthenticationError('Failed to login with google'));
        } else {
            service.loginCallback(user)
                .then((loginResponse) => res.json(loginResponse))
                .catch((err) => next(err));
        }
    })(req, res, next);
};

export const logoutAuth = async (req: Request, res: Response) => {
    // Clear client jwt cookie if such exists
    if (req.cookies[authConfig.tokenName]) {
        res.clearCookie(authConfig.tokenName);
    }
    res.sendStatus(200);
};
