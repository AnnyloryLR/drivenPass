import { Request, Response } from "express";
import { createCredential, readAllCredentials, readCredentialById, updateCredential, credentialDeletion } from "services/credentials-service";
import httpStatus from "http-status";
import { CredentialData } from "../repositories/credentials-repository";

export async function newCredential(req: Request, res: Response){
    const { user_id, credentialData} = req.body;

    await createCredential(user_id, credentialData);

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
    const updateData = req.body as CredentialData;

    const result = await updateCredential(updateData);

    res.status(204).send(result);  
}

export async function deleteCredential(req:Request, res:Response){
    const { id } = req.params;

    const result = await credentialDeletion(id);

    res.status(204).send(result);
}

