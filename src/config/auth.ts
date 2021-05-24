import { config } from 'dotenv';
import ApplicationException from '../model/ApplicationException';

if (!process.env.JWT_SECRET) {
    throw new ApplicationException('JWT error', 'JWT secret not found as env variable.');
}

config();
export default {
    tokenName: 'jwt',
    jwtSecret: `${process.env.JWT_SECRET}`,
    jwtExpires: '2d',
    googleClientId: `${process.env.GOOGLE_CLIENT_ID}`,
    googleClientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
};
