import { NextFunction, Request, Response } from 'express';

import questionRepository from '../repository/QuestionRepository';

import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    ValidationError
} from '../model/HttpError';
import { isEmptyBody, isValidId } from '../utils/RequestUtils';
import { Question } from '../entity/Question';

export const findOne = (req: Request, res: Response, next: NextFunction) => {
    if (!isValidId(req.params.questionId)) throw new ValidationError('Invalid id');
    questionRepository.findById(req.params.questionId)
        .then((question) => {
            if (!question) throw new NotFoundError('Question not found');

            res.json(question);
        })
        .catch((err) => next(err));
};

export const findAllByTestId = (req: Request, res: Response, next: NextFunction) => {
    if (isEmptyBody(req.body)) {
        throw new BadRequestError('Empty body');
    }
    if (!req.body.testId) throw new BadRequestError('Missing theme id');
    questionRepository.findAllByTestId(req.body.testId)
        .then((questions) => {
            res.json(questions);
        })
        .catch((err) => next(err));
};

export const create = (req: Request, res: Response, next: NextFunction) => {
    if (isEmptyBody(req.body)) {
        throw new BadRequestError('Empty body');
    }
    if (!(req.body.testId && req.body.question && req.body.questionNumber && req.body.answers)) {
        throw new BadRequestError('Invalid body');
    }

    questionRepository.create(new Question('', req.body.testId, req.body.question, req.body.questionNumber, req.body.answers))
        .then((question) => {
            res.json(question);
        })
        .catch((err) => next(err));
};

export const update = (req: Request, res: Response, next: NextFunction) => {
    if (isEmptyBody(req.body)) {
        throw new BadRequestError('Empty body');
    }
    if (!(req.body.testId && req.body.question && req.body.questionNumber && req.body.answers)) {
        throw new BadRequestError('Invalid body');
    }

    questionRepository.update(new Question(req.params.questionId, req.body.testId, req.body.question, req.body.questionNumber, req.body.answers))
        .then((question) => {
            res.json(question);
        })
        .catch((err) => next(err));
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
    questionRepository.delete(req.params.questionId)
        .then((question) => {
            if (question) res.sendStatus(200);
            else next(new InternalServerError('Delete question error'));
        })
        .catch((err) => next(err));
};
