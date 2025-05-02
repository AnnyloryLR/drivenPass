import { conflictError, notFound, unauthorized } from "errors/errors";
import { getUserData, signUp, signIn, UserData, SignInData } from "repositories/users-repository";
import { User } from "../../generated/prisma";

export async function createUser(userData: UserData){
    const { email } = userData;

    const exist = await getUserData(email);

    if(!exist) throw conflictError(email);

    const result = await signUp(userData);

    return result;
}

export async function logIn(logIn: boolean, signInData: SignInData){
    const { registeredUser } = await signIn(signInData);

    if(!registeredUser) throw notFound;

    if(!logIn) throw unauthorized;

    const 
   
}
