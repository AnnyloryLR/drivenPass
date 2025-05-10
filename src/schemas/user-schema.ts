import joi from 'joi';
import { User } from 'repositories/users-repository';

type LogIn = {
    email:string;
    password:string;
}

export const signUpSchema = joi.object<User>({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

export const signInSchema = joi.object<LogIn>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});