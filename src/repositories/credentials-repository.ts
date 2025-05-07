import prisma from "database/config";
import { Credential } from "../../generated/prisma";
import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.UUID;

const cryptr = new Cryptr(secretKey);

export type CredentialData = Omit<Credential,"id" | "userId">;

export async function getCredentialByTitle(title: string){
    const exist = await prisma.credential.findFirst({
        where:{
            title:title
        }
    });

    return exist;
}

export async function newCrendential(user_id: number ,credentialData: CredentialData){
    const { title, url, username, password } = credentialData;

    const encryptedPassword = cryptr.encrypt(password);

    const credential = await prisma.credential.create({
        data:{
            title,
            url,
            username,
            password: encryptedPassword,
            userId: user_id
        }
    });

    return credential;
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

export async function getCredentialById(id:string){
    const credential_id = Number(id);

    const credential = await prisma.credential.findFirst({
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
    const { title, url, username, password } = updateData;

    const credential = await getCredentialByTitle(title);

    const updatedCredential: Credential = await prisma.credential.update({
        where:{
            id:credential.id
        },

        data:{
            id: credential.id,
            title,
            url,
            username,
            password,
            userId: credential.userId
        }
    })

    return updatedCredential;
}

export async function deleteCredential(id:string){
    const credential_id = Number(id)
    const deleted = await prisma.credential.delete({
        where:{
            id:credential_id
        }
    });

    return deleted;
}