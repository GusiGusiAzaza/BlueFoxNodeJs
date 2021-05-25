import { NextFunction, Request, Response } from 'express';

import testResultRepository from '../repository/TestResultRepository';

import {
    BadRequestError,
    NotFoundError,
    ValidationError
} from '../model/HttpError';
import { isEmptyBody, isValidId } from '../utils/RequestUtils';
import { TestResult } from '../entity/TestResult';

export const findOne = (req: Request, res: Response, next: NextFunction) => {
    if (!isValidId(req.params.testResultId)) throw new ValidationError('Invalid id');
    testResultRepository.findById(req.params.testResultId)
        .then((testResult) => {
            if (!testResult) throw new NotFoundError('TestResult not found');

            res.json(testResult);
        })
        .catch((err) => next(err));
};

export const findAllByUserId = (req: Request, res: Response, next: NextFunction) => {
    if (isEmptyBody(req.body)) {
        throw new BadRequestError('Empty body');
    }
    if (!req.body.userId) throw new BadRequestError('Missing user id');
    testResultRepository.findAllByUserId(req.body.userId)
        .then((testResults) => {
            res.json(testResults);
        })
        .catch((err) => next(err));
};

export const create = (req: Request, res: Response, next: NextFunction) => {
    if (isEmptyBody(req.body)) {
        throw new BadRequestError('Empty body');
    }
    if (!(req.body.testId && req.body.testResult && req.body.testResultNumber && req.body.answers)) {
        throw new BadRequestError('Invalid body');
    }

    testResultRepository.create(new TestResult('', req.body.testId, req.body.testResult, req.body.testResultNumber, req.body.answers))
        .then((testResult) => {
            res.json(testResult);
        })
        .catch((err) => next(err));
};
