import UserModel, { User, IUser } from '../entity/User';
import authRepository from '../repository/AuthRepository';
import { ValidationError } from '../model/HttpError';

class UserRepository {
    async findById(id: string): Promise<IUser['_id']> {
        return UserModel.findById(id);
    }

    async create(user: User): Promise<IUser['_id']> {
        if (!await authRepository.findById(user.id)) throw new ValidationError('User id not found');
        const { id, ...userData } = user;

        return UserModel.create({ _id: user.id, ...userData });
    }
}

export default new UserRepository();
