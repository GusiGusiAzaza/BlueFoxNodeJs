import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { AuthenticationError } from '../model/HttpError';

export const validateJwtMiddleware = (req: Request<any>, res: Response, next: NextFunction) => {
    // if user have jwt cookie or auth header
    if (req.cookies.jwt || req.headers.Authorization || req.headers.authorization) {
        // set auth header if there is no such
        if (!req.headers.Authorization && !req.headers.authorization) {
            req.headers.authorization = `Bearer ${req.cookies.jwt}`;
        }

        // try to auth user
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.clearCookie('jwt');
                return next(new AuthenticationError('Your auth token is incorrect or expired.'));
            }
            // create req.user
            req.logIn(user, { session: false }, (err) => {
                if (err) {
                    return next(err);
                }
                return next();
            });
        })(req, res, next);
    } else {
        // If no jwt
        return next(new AuthenticationError('You must be authorized, before accessing this.'));
    }
};
