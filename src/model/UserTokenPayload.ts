import { Role } from '../entity/Auth';

export default interface IUserTokenPayload {
    _id: string
    _role: Role
}
