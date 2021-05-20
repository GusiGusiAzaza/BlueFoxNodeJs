import { config } from 'dotenv';
import ApplicationException from '../model/ApplicationException';

if (!process.env.JWT_SECRET) {
    throw new ApplicationException('JWT error', 'JWT secret not found as env variable.');
}

config();
export default {
    tokenName: 'jwt',
    jwtSecret: `${process.env.JWT_SECRET}`,
    jwtExpires: '7d',
    googleClientId: `${process.env.GOOGLE_CLIENT_ID}`,
    googleClientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    FACEBOOK_APP_ID: `${process.env.FACEBOOK_APP_ID}`,
    FACEBOOK_APP_SECRET: `${process.env.FACEBOOK_APP_SECRET}`,
    FACEBOOK_GRAPH_VERSION: `${process.env.FACEBOOK_GRAPH_VERSION}`,
    FRONTEND_ADDRESS: `${process.env.FRONTEND_ADDRESS}`,
    AUTH_SERVER_ADDRESS: `${process.env.AUTH_SERVER_ADDRESS}`
};
