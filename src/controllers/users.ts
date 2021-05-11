import { NextFunction, Request, Response } from 'express';

import userRepository from '../repository/UserRepository';

import { User } from '../entity/User';
import { BadRequestError, NotFoundError, ValidationError } from '../model/HttpError';
import { isEmptyBody, isValidId } from '../utils/RequestUtils';

// Url params
interface Parameters {
    userId: string;
}

export const getUser = (req: Request<Parameters>, res: Response, next: NextFunction) => {
    if (!isValidId(req.params.userId)) throw new ValidationError('Invalid id');
    userRepository.findById(req.params.userId)
        .then((user) => {
            if (!user) throw new NotFoundError('User not found');

            res.json(user);
        })
        .catch((error) => next(error));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    if (isEmptyBody(req.body)) return next(new BadRequestError('Empty body'));
    console.log(req.body.id);
    userRepository.create(
        new User(req.body.id)
    )
        .then((user) => {
            if (!user) throw new NotFoundError('User not found');

            res.json(user);
        })
        .catch((error) => next(error));
};

export const updateUser = (req: Request<Parameters>, res: Response, next: NextFunction) => {

    // delete req.body.userId;
    //
    // if (req.body && Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    //     throw new BadRequestError('Body is empty');
    // }
    //
    // const userProfile: UserResponse = new UserResponse(req.params.userId);
    // objectUtils.assignProperties(userProfile, req.body);
    //
    // userRepo.update(userProfile as User)
    //     .then((user) => {
    //         objectUtils.assignProperties(userProfile, user);
    //         res.json(userProfile);
    //     })
    //     .catch((error) => next(error));
};
