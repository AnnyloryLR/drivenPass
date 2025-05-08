import { Request, Response } from "express";
import { createCredential, readAllCredentials, readCredentialById, updateCredential, credentialDeletion } from "../services/credentials-service";
import httpStatus from "http-status";
import { CredentialData } from "../repositories/credentials-repository";

export async function newCredential(req: Request, res: Response){
    const { title, url, username, password } = req.body as CredentialData;

    const userId = res.locals.user.id

    const credentialData = {
        title,
        url,
        username,
        password, 
        userId
    }

    await createCredential(credentialData);

    res.sendStatus(httpStatus.CREATED);
}

export async function getAllCredentials(req: Request, res: Response){
    const result = await readAllCredentials();

    res.status(200).send(result);    
}

export async function getCredentialById(req: Request, res: Response){
    const {id} = req.params;

    const result = await readCredentialById(id);

    res.status(200).send(result);
}

export async function credentialUpdate(req: Request, res: Response){
    const { title, url, username, password } = req.body as CredentialData;

    const userId = res.locals.user.id

    const credentialData = {
        title,
        url,
        username,
        password, 
        userId
    }

    const result = await updateCredential(credentialData);

    res.status(204).send(result);  
}

export async function deleteCredential(req:Request, res:Response){
    const { id } = req.params;

    const result = await credentialDeletion(id);

    res.status(204).send(result);
}

