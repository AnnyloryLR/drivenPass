import prisma from 'database/config';
import { User } from '../../generated/prisma';
import bcrypt from 'bcrypt';

type UserData = Omit<User,"id">;

type SignInData = Omit<User, "id" & "name">;

export async function getUserData(email:string){
   
    const result = await prisma.user.findFirst({
        where:{
            email: email
        }
    })

    return result;
}

export async function signUp(userData:UserData){
    const { name, email, password } = userData; 
    
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        }
    });

    return user;
}

export async function signIn(signInData:SignInData){
    const { email, password } = signInData;

    const registeredUser = await prisma.user.findFirst({
        where:{
            email: email
        }
    })

    const logIn = bcrypt.compareSync(registeredUser.password, password);

    return logIn;
}
