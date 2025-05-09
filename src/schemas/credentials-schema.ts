import joi from 'joi';
import { Credential } from '../../prisma/generated/prisma';

export const credentialSchema = joi.object<Credential>({
    title: joi.string().required(),
    url: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required()
});
