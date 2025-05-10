import prisma from "../database/config";
import { credentials } from "@prisma/client";
import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.UUID;

const cryptr = new Cryptr(secretKey);

export type Credential = credentials;

export type CredentialData = {
    title: string;
    url: string;
    username: string;
    password: string;
    userId: number;
}

export async function getCredentialByTitle(title: string){
    const exist = await prisma.credentials.findFirst({
        where:{
            title:title
        }
    });

    return exist;
}

export async function newCrendential(credentialData: CredentialData){
    const { title, url, username, password, userId } = credentialData;

    const encryptedPassword = cryptr.encrypt(password);

    const credential = await prisma.credentials.create({
        data:{
            title,
            url,
            username,
            password: encryptedPassword,
            userId
        }
    });

    return credential;
}

export async function getAllCredentials(){
    const decryptedCredentials: Credential[] = [];
    
    const credentials = await prisma.credentials.findMany();
    for (const credential of credentials){
        decryptedCredentials.push({
            id: credential.id,
            title: credential.title,
            url: credential.url,
            username: credential.username,
            password: cryptr.decrypt(credential.password),
            userId: credential.userId
        })
    }

    return decryptedCredentials;
}

export async function getCredentialById(id:string){
    const credential_id = Number(id);

    const credential = await prisma.credentials.findFirst({
        where: {
            id:credential_id
        }
    });

    const decryptedCredential = {
        
        id,
        title: credential.title,
        url: credential.url,
        username: credential.username,
        password: cryptr.decrypt(credential.password),
        userId : credential.userId
        
    }

    return decryptedCredential;
}

export async function credentialUpdte(updateData:CredentialData){
    const { title, url, username, password, userId } = updateData;

    const credential = await getCredentialByTitle(title);

    const updatedCredential: Credential = await prisma.credentials.update({
        where:{
            id:credential.id
        },

        data:{
            id: credential.id,
            title,
            url,
            username,
            password,
            userId
        }
    })

    return updatedCredential;
}

export async function deleteCredential(id:string){
    const credential_id = Number(id)
    const deleted = await prisma.credentials.delete({
        where:{
            id:credential_id
        }
    });

    return deleted;
}