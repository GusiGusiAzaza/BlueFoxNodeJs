import AuthModel, { Auth, IAuth } from '../entity/Auth';

import { ValidationError } from '../model/HttpError';

class AuthRepository {
    async findOneLogin(login: string): Promise<IAuth['_id']> {
        return AuthModel.findOne({ login: login });
    }

    async findById(id: string): Promise<IAuth['_id']> {
        return AuthModel.findById(id);
    }

    async create(auth: Auth): Promise<IAuth['_id']> {
        if (await this.findOneLogin(auth.login)) throw new ValidationError('Login already taken');

        return AuthModel.create(auth);
    }
}

export default new AuthRepository();
