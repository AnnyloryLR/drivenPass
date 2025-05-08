import { Request, Response } from "express";
import { eraseProfile } from "services/erase-service";
import httpStatus from "http-status";

export async function eraseAccount( req: Request, res: Response){
    const { id } = req.params;

    await eraseProfile(id);

    res.sendStatus(httpStatus.NO_CONTENT);
}