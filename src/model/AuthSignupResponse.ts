export default class AuthSignupResponse {
    message: string;
    id: string;

    constructor(
        message: string,
        id: string
    ) {
        this.message = message;
        this.id = id;
    }
}
