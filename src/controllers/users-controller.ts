import { Request, Response } from "express";
import { createUser, logIn } from "../services/users-service";
import httpStatus from "http-status";
import { SignInData, UserData } from "../repositories/users-repository";

export async function signUp(req: Request, res: Response){
    const userData = req.body as UserData;

    await createUser(userData);

    res.sendStatus(httpStatus.CREATED);
}

export async function signIn(req: Request, res: Response){
    const signInData = req.body as SignInData;

    const result = await logIn(signInData);

    res.status(200).send(result);
}