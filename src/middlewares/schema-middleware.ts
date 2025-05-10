import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";
import { User } from "repositories/users-repository";
import { Credential } from "repositories/credentials-repository";

export function schemaValidate( schema: ObjectSchema ){
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body as User | Credential;
        const validation = schema.validate(body);

        if(validation.error){
            res.status(httpStatus.UNPROCESSABLE_ENTITY)
            .send(validation.error.details.map(detail => detail.message));
        }

        next();
    }
}