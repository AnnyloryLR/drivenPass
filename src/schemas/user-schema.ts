import joi from 'joi';
import { User } from '../../generated/prisma';

export const signUpSchema = joi.object<User>({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

type LogIn = Omit<User, "name">;

export const signInSchema = joi.object<LogIn>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});