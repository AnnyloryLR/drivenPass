import { conflictError, notFound, unauthorized } from "errors/errors";
import { getUserData, signUp, signIn, UserData, SignInData } from "repositories/users-repository";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function createUser(userData: UserData){
    const { email } = userData;

    const exist = await getUserData(email);

    if(!exist) throw conflictError(email);

    const result = await signUp(userData);

    return result;
}

export async function logIn(signInData: SignInData){
    const { registeredUser } = await signIn(signInData);

    if(!registeredUser) throw notFound;

    if(!logIn) throw unauthorized;

    const token = jwt.sign(
        {userId: registeredUser.id},
        process.env.JWT_SECRET,
        {expiresIn:86400});

    return token;
}
