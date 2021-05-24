import { NextFunction, Request, Response } from 'express';

import userRepository from '../repository/UserRepository';

import { User } from '../entity/User';
import { BadRequestError, NotFoundError, ValidationError } from '../model/HttpError';
import { isEmptyBody, isValidId } from '../utils/RequestUtils';
import IUserTokenPayload from '../model/UserTokenPayload';

// Url params
interface Parameters {
    userId: string;
}

export const findOne = async (req: Request<Parameters>, res: Response, next: NextFunction) => {
    if (!isValidId(req.params.userId)) throw new ValidationError('Invalid id');
    userRepository.findById(req.params.userId)
        .then((user) => {
            if (!user) throw new NotFoundError('User not found');

            res.json(user);
        })
        .catch((error) => next(error));
};

export const updateUser = async (req: Request<Parameters>, res: Response, next: NextFunction) => {
    delete req.body.id;
    delete req.body.email;
    delete req.body.rightAnswered;
    delete req.body.totalAnswered;
    delete req.body.avgScore;
    delete req.body.finishedTestsCount;
    delete req.body.passedTestsCount;

    console.log('UPDATE');

    const userToken = req.user as IUserTokenPayload;

    if (isEmptyBody(req.body)) {
        return next(new BadRequestError('Body is empty'));
    }
    const userProfile: User = await userRepository.findById(userToken._id);
    if (req.body.username !== undefined) userProfile.username = req.body.username;
    if (req.body.firstName !== undefined) userProfile.firstName = req.body.firstName;
    if (req.body.lastName !== undefined) userProfile.lastName = req.body.lastName;
    if (req.body.address !== undefined) userProfile.address = req.body.address;
    if (req.body.city !== undefined) userProfile.city = req.body.city;
    if (req.body.country !== undefined) userProfile.country = req.body.country;

    userRepository.update(userProfile)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => next(error));
};
