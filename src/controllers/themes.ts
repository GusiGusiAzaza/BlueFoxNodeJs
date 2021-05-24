import { NextFunction, Request, Response } from 'express';

import themeRepository from '../repository/ThemeRepository';

import { BadRequestError } from '../model/HttpError';
import { isEmptyBody } from '../utils/RequestUtils';

export const findAll = (req: Request, res: Response, next: NextFunction) => {
    themeRepository.findAll()
        .then((themes) => {
            res.json(themes);
        })
        .catch((err) => next(err));
};

export const create = (req: Request, res: Response, next: NextFunction) => {
    if (isEmptyBody(req.body)) {
        return next(new BadRequestError('Body is empty'));
    }
    if (!req.body.name) throw new BadRequestError('Missing theme name');

    console.log(req.body.name);

    themeRepository.create(req.body.name.toString())
        .then((theme) => {
            res.json(theme);
        })
        .catch((err) => next(err));
};
