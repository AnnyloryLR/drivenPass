import { Request, Response } from "express";
import { eraseProfile } from "../services/erase-service";
import httpStatus from "http-status";

export async function eraseAccount( req: Request, res: Response){
    const userId = res.locals.user.id as number;

    await eraseProfile(userId);

    res.sendStatus(httpStatus.NO_CONTENT);
}