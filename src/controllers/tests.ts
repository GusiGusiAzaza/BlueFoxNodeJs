import { NextFunction, Request, Response } from 'express';

import testRepository from '../repository/TestRepository';

import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    ValidationError
} from '../model/HttpError';
import { isEmptyBody, isValidId } from '../utils/RequestUtils';
import { Test } from '../entity/Test';

export const findOne = (req: Request, res: Response, next: NextFunction) => {
    if (!isValidId(req.params.testId)) throw new ValidationError('Invalid id');
    testRepository.findById(req.params.testId)
        .then((test) => {
            if (!test) throw new NotFoundError('Test not found');

            res.json(test);
        })
        .catch((err) => next(err));
};

export const findAllByThemeId = (req: Request, res: Response, next: NextFunction) => {
    if (isEmptyBody(req.body)) {
        throw new BadRequestError('Empty body');
    }
    if (!req.body.themeId) throw new BadRequestError('Missing theme id');
    testRepository.findAllByThemeId(req.body.themeId)
        .then((tests) => {
            res.json(tests);
        })
        .catch((err) => next(err));
};

export const create = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    if (isEmptyBody(req.body)) {
        throw new BadRequestError('Empty body');
    }
    if (!(req.body.name && req.body.themeId && req.body.timeLimit && req.body.passScore)) {
        throw new BadRequestError('Invalid body');
    }

    testRepository.create(new Test('', req.body.name, req.body.themeId, req.body.timeLimit, req.body.passScore))
        .then((test) => {
            res.json(test);
        })
        .catch((err) => next(err));
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
    testRepository.delete(req.params.testId)
        .then((test) => {
            if (test) res.sendStatus(200);
            else next(new InternalServerError('Delete test error'));
        })
        .catch((err) => next(err));
};
