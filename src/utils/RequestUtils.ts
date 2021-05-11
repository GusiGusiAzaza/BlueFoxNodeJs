import { Types } from 'mongoose';
import ObjectId = Types.ObjectId;

// RFC 5322
const EMAIL_EXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isEmptyBody = (body: object): boolean => (!body || (Object.keys(body).length === 0 && body.constructor === Object));
export const isValidSignup = (email: string, password: string): boolean => (EMAIL_EXP.test(email.toLocaleLowerCase()) && password.length >= 6);
export const isValidId = (id: string): boolean => ObjectId.isValid(id);
