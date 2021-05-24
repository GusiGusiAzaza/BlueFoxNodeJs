import { NextFunction, Request, Response } from 'express';
import IUserTokenPayload from '../model/UserTokenPayload';
import AuthRepository from '../repository/AuthRepository';
import { AuthorizationError } from '../model/HttpError';

export const adminRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as IUserTokenPayload;

        if ((await AuthRepository.findById(user._id)).isAdmin) return next();
        return next(new AuthorizationError('Admins only'));
    } catch (e) {
        return next(e);
    }
};
