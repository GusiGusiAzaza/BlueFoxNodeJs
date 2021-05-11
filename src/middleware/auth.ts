import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';

import authConfig from '../config/auth';
import authService from '../service/AuthService';

const LocalStrategy = passportLocal.Strategy;
const JWTstrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
const GoogleTokenStrategy = require('passport-google-token').Strategy;

passport.use('signup', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, authService.passportSignup));

passport.use('login', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, authService.passportLogin));

passport.use(new JWTstrategy({
    secretOrKey: authConfig.jwtSecret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, authService.passportVerifyJwt));

passport.use('google', new GoogleTokenStrategy({
    clientID: authConfig.googleClientId,
    clientSecret: authConfig.googleClientSecret
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    await authService.socialNetworkLogin(profile)
        .then((user) => done(null, user))
        .catch((err) => done(err, null));
}));
