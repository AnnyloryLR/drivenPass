import { eraseAccount } from "repositories/erase-repository";

export async function eraseProfile(id:string){
    
    const result = await eraseAccount(id);

    return result;
}