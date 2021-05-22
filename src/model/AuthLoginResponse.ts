import AuthSignupResponse from './AuthSignupResponse';
import { Role } from '../entity/Auth';

export default class AuthLoginResponse extends AuthSignupResponse {
    token: string;

    constructor(
        message: string,
        id: string,
        role: Role,
        token: string
    ) {
        super(message, id, role);
        this.token = token;
    }
}
