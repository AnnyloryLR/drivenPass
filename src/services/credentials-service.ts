import { conflictError, notFound } from "../errors/errors";
import { getCredentialByTitle, getCredentialById, newCrendential, getAllCredentials, credentialUpdte,
    deleteCredential, CredentialData } from "../repositories/credentials-repository";


export async function createCredential(credentialData: CredentialData){
    const { title, userId } = credentialData;

    const titleExistent = await getCredentialByTitle(title);

    if(titleExistent && titleExistent.userId == userId) throw conflictError(title);

    const result = await newCrendential(credentialData);

    return result;
}

export async function readAllCredentials(){
    const credentials  = await getAllCredentials();

    return credentials;
}

export async function readCredentialById(id:string){
    
    const credential = await getCredentialById(id);

    if(!credential) throw notFound;

    return credential;
}

export async function updateCredential(updateData: CredentialData){
    const { title } = updateData;
    
    const credential = await getCredentialByTitle(title)

    if(!credential) throw notFound;

    const result = await credentialUpdte(updateData);

    return result;
}

export async function credentialDeletion(id: string){
    const credential = await getCredentialById(id);

    if(!credential) throw notFound;

    const result = await deleteCredential(id);

    return result;
}