import { NextFunction, Request, Response } from 'express';

export const pageTypeMiddleware = (defaultPageSize: number, maxPageSize: number) => function _middleware(req: Request, res: Response, next: NextFunction) {
    let _pageSize: number;
    let _page: number;

    if (defaultPageSize < 0) {
        defaultPageSize = 10;
    }

    if (maxPageSize < 0) {
        maxPageSize = 50;
    }

    _page = (typeof req.query.page === 'string') ? parseInt(req.query.page, 10) || 1 : 1;

    _pageSize = (typeof req.query.pageSize === 'string') ? parseInt(req.query.pageSize, 10) || defaultPageSize : defaultPageSize;

    if (_pageSize > maxPageSize) {
        _pageSize = maxPageSize;
    }

    if (_pageSize < 0) {
        _pageSize = defaultPageSize;
    }

    if (_page < 1) {
        _page = 1;
    }

    req.body.offset = (_pageSize * (_page - 1));

    req.query.page = _page.toString();
    req.query.pageSize = _pageSize.toString();

    next();
};

export const showMoreTypeMiddleware = (defaultPageSize: number, maxPageSize: number) => function _middleware(req: Request, res: Response, next: NextFunction) {
    let _pageSize: number;

    if (defaultPageSize < 0) {
        defaultPageSize = 10;
    }

    if (maxPageSize < 0) {
        maxPageSize = 50;
    }

    _pageSize = (typeof req.query.pageSize === 'string') ? parseInt(req.query.pageSize, 10) || defaultPageSize : defaultPageSize;

    if (req.query.nextPageToken === 'null' || req.query.nextPageToken === '') {
        req.query.nextPageToken = undefined;
    }

    if (_pageSize > maxPageSize) {
        _pageSize = maxPageSize;
    }

    if (_pageSize < 0) {
        _pageSize = defaultPageSize;
    }

    req.query.pageSize = _pageSize.toString();

    next();
};
