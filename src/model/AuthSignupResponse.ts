import { Role } from '../entity/Auth';

export default class AuthSignupResponse {
    message: string;
    id: string;

    constructor(
        message: string,
        id: string,
        role: Role
    ) {
        this.message = message;
        this.id = id;
    }
}
