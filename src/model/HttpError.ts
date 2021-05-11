import ApplicationException from './ApplicationException';

export default class GenericHttpError extends ApplicationException {
    status: number;

    constructor(status: number, code: string, message: string) {
        super(code, message);
        this.status = status || 500;
    }
}

export class BadRequestError extends GenericHttpError {
    constructor(message: string) { super(400, 'Bad Request', message); }
}

export class AuthenticationError extends GenericHttpError {
    constructor(message: string) { super(401, 'Unauthorized', message); }
}

export class AuthorizationError extends GenericHttpError {
    constructor(message: string) { super(403, 'Forbidden', message); }
}

export class NotFoundError extends GenericHttpError {
    constructor(message: string) { super(404, 'Not Found', message); }
}

export class ValidationError extends GenericHttpError {
    constructor(message: string) { super(406, 'Validation Error', message); }
}

export class InternalServerError extends GenericHttpError {
    constructor(message: string) { super(500, 'Internal Server Error', message); }
}
