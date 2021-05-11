import AuthSignupResponse from './AuthSignupResponse';

export default class extends AuthSignupResponse {
    token: string;

    constructor(
        message: string,
        id: string,
        token: string
    ) {
        super(message, id);
        this.token = token;
    }
}
