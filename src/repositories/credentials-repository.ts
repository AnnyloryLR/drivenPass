import prisma from "database/config";
import { Credential } from "../../generated/prisma";
import Cryptr from "cryptr";

import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.UUID;

const cryptr = new Cryptr(secretKey);

type CredentialData = Omit<Credential,"id" | "userId">;

export async function newCrendential(email: string,credentialData: CredentialData){
    const { title, url, username, password } = credentialData;

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    }); 
    
    const encryptedPassword = cryptr.encrypt(user.password);

    const credential = await prisma.credential.create({
        data:{
            title,
            url,
            username,
            password: encryptedPassword,
            userId: user.id
        }
    });

}

export async function getAllCredentials(){
    const decryptedCredentials: Credential[] = [];
    
    const credentials = await prisma.credential.findMany();
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

export async function getCredentialById(id:number){

    const credential = await prisma.credential.findFirst({
        where: {
            id:id
        }
    });

    const decryptedCredential = {
        
        title: credential.title,
        url: credential.url,
        username: credential.username,
        password: cryptr.decrypt(credential.password)
        
    }

    return decryptedCredential;
}

export async function credentialUpdte(id:number, credentialData:CredentialData){
    const { title, url, username, password } = credentialData;

    const credential: Credential = await prisma.credential.findFirst({
        where: {
            id:id
        }
    })

    const updateCredential: Credential = await prisma.credential.update({
        where:{
            id:id
        },

        data:{
            title,
            url,
            username,
            password,
            userId: credential.userId
        }
    })
}

export async function deleteCredential(id:number){
    const deleted = await prisma.credential.delete({
        where:{
            id:id
        }
    });

    return deleted;
}