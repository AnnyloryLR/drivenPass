import { conflictError, notFound } from "errors/errors";
import { getCredentialByTitle, getCredentialById, newCrendential, getAllCredentials, credentialUpdte,
    deleteCredential, CredentialData} from "repositories/credentials-repository";


export async function createCredential(user_id: number, credentialData: CredentialData){
    const { title } = credentialData;

    const titleExistent = await getCredentialByTitle(title);

    if(titleExistent) throw conflictError;

    const result = await newCrendential(user_id, credentialData);

    return result;
}

export async function readAllCredentials(){
       const credentials  = await getAllCredentials();

    if (!credentials) throw notFound;

    return credentials;
}

export async function readCredentialById(id:number){
    
    const credential = await getCredentialById(id);

    if(!credential) throw notFound;

    return credential;

}

export async function updateCredential( id: number, credentialData: CredentialData){
    const credential = await getCredentialById(id);

    if(!credential) throw notFound;

    const result = await credentialUpdte(id, credentialData);

    return result;
}

export async function credentialDeletion(id: number){
    const credential = await getCredentialById(id);

    if(!credential) throw notFound;

    const result = await deleteCredential(id);

    return result;
}