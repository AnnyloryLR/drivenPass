import { eraseAccount } from "../repositories/erase-repository";

export async function eraseProfile(userId:number){
    
    const result = await eraseAccount(userId);

    return result;
}