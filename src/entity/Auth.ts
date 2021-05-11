import { model, Schema, Document } from 'mongoose';

const authSchema = new Schema({
    role: {
        type: Number,
        enum: [0, 1],
        default: 0,
        required: true
    },
    login: {
        type: String,
        unique: true
    },
    nickname: String,
    password: String
});

export enum Role {
    User = 0,
    Admin
}

export interface IAuth extends Document {
    id: string;
    login: string;
    role: Role;
    password: string;
    nickname: string;
}

export class Auth {
    id: string;
    login: string;
    role: Role;
    password?: string;
    nickname?: string;

    constructor(
        id: string,
        login: string,
        role: Role,
        password?: string,
        nickname?: string
    ) {
        this.id = id;
        this.login = login;
        this.role = role;
        this.password = password;
        this.nickname = nickname;
    }
}

const AuthModel = model<IAuth>('Auth', authSchema);

export default AuthModel;
