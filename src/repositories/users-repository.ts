import prisma from '../database/config';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

export type UserData = {
    name:string,
    email:string,
    password:string
}

export type SignInData = {
    email:string,
    password:string
}

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

    const registeredUser: User = await prisma.user.findFirst({
        where:{
            email: email
        }
    })

    const logIn: boolean = bcrypt.compareSync(registeredUser.password, password);

    return { registeredUser, logIn };
}
