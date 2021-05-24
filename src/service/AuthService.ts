import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';

import { VerifiedCallback } from 'passport-jwt';
import authConfig from '../config/auth';

import { AuthenticationError, ValidationError } from '../model/HttpError';
import authRepository from '../repository/AuthRepository';
import AuthLoginResponse from '../model/AuthLoginResponse';

import { Auth } from '../entity/Auth';
import { isValidSignup } from '../utils/RequestUtils';
import userRepository from '../repository/UserRepository';
import { User } from '../entity/User';

/**
 * Authentication service.
 */
class AuthService {
    passportSignup = async (login: string, password: string, done: any) => {
        console.log(`Signing up: ${login}`);
        // Simple validation
        if (!isValidSignup(login, password)) {
            return done(new ValidationError('Incorrect email or password.'));
        }

        await authRepository.create(
            new Auth('', login, false, await this.hashPassword(password))
        )
            .then(async (result) => {
                await userRepository.create(
                    new User(result.id, login)
                );
                return done(null, result);
            })
            .catch((err) => done(err));
    };

    passportLogin = async (login: string, password: string, done: any) => {
        try {
            console.log(`Logging in ${login}`);

            // Simple validation
            if (!isValidSignup(login, password)) {
                return done(new ValidationError('Incorrect email or password.'));
            }

            const auth = await authRepository
                .findOneLogin(login)
                .then((authLogin) => {
                    if (!authLogin) {
                        return done(new AuthenticationError('User with such credentials not found'));
                    }
                    return authRepository.findById(authLogin.id);
                });

            if (!auth || !auth.password) {
                return done(new AuthenticationError('User with such credentials not found'));
            }

            if (!await this.comparePassword(password, auth.password)) {
                return done(new AuthenticationError('User with such credentials not found'));
            }

            return done(null, auth, { message: 'Logged in successfully' });
        } catch (error) {
            return done(new AuthenticationError(error.message));
        }
    };

    passportVerifyJwt = async (token: any, done: VerifiedCallback) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(new ValidationError(error.message));
        }
    };

    socialNetworkLogin = async (profile: any) => {
        await authRepository.create(
            new Auth('', profile.emails[0].value, false)
        ).then(async (result) => {
            await userRepository.create(
                new User(result.id, profile.emails[0].value)
            );
            return result;
        });

        return authRepository.findOneLogin(profile.emails[0].value);
    };

    loginCallback = async (user: Auth) => {
        if (!user.id) throw new ValidationError('undefined id');
        const body = { _id: user.id.toString(), _isAdmin: user.isAdmin };
        return this.generateToken(body).then((token) => new AuthLoginResponse('Login successful', user.id, user.isAdmin, token));
    };

    generateToken = async (body: any) => jwt.sign(
        { user: body },
        authConfig.jwtSecret,
        { expiresIn: authConfig.jwtExpires }
    )

    isAdmin = async (userId: string): Promise<boolean> => authRepository.findById(userId)
        .then((auth) => auth.isAdmin)
        .catch((err) => {
            console.log(err);
        });

    hashPassword = async (password: string, saltRounds = 12): Promise<string> => hash(password, saltRounds);

    comparePassword = async (password: string, passwordHash: string): Promise<boolean> => compare(password, passwordHash);
}

export default new AuthService();
