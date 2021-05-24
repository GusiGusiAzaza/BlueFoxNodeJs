import AuthSignupResponse from './AuthSignupResponse';

export default class AuthLoginResponse extends AuthSignupResponse {
    token: string;
    isAdmin: boolean;

    constructor(
        message: string,
        id: string,
        isAdmin: boolean,
        token: string
    ) {
        super(message, id);
        this.token = token;
        this.isAdmin = isAdmin;
    }
}
