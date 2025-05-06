import { getCredentialTitle, getCredentialById, newCrendential, getAllCredentials, credentialUpdte,
    deleteCredential, CredentialData} from "repositories/credentials-repository";


export async function createCredential(credentialData: CredentialData){
    const { title, url, username, password} = credentialData;

    

    const titleExistent = await getCredentialTitle(title);



}