import UserModel, { User, IUser } from '../entity/User';
import authRepository from '../repository/AuthRepository';
import { ValidationError } from '../model/HttpError';

class UserRepository {
    async findById(id: string): Promise<IUser['_id']> {
        return UserModel.findById(id);
    }

    async create(user: User): Promise<IUser['_id']> {
        const { id, ...userData } = user;

        return UserModel.create({ _id: user.id, ...userData });
    }

    async update(user: User): Promise<IUser['_id']> {
        if (!await authRepository.findById(user.id)) throw new ValidationError('User not found');
        console.log(user);
        await UserModel.update({ _id: user.id }, user);

        return this.findById(user.id);
    }
}

export default new UserRepository();
