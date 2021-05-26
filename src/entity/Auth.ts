import { model, Schema, Document } from 'mongoose';

const authSchema = new Schema({
    isAdmin: {
        type: Boolean,
        default: 0,
        required: true
    },
    login: {
        type: String,
        unique: true
    },
    password: String
});

export interface IAuth extends Document {
    id: string;
    login: string;
    isAdmin: boolean;
    password: string;
}

export class Auth {
    id: string;
    login: string;
    isAdmin: boolean;
    password?: string;

    constructor(
        id: string,
        login: string,
        isAdmin: boolean,
        password?: string
    ) {
        this.id = id;
        this.login = login;
        this.isAdmin = isAdmin;
        this.password = password;
    }
}

const AuthModel = model<IAuth>('Auth', authSchema);

export default AuthModel;
