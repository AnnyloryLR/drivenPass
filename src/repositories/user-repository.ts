import prisma from 'database/config';
import { User } from '../../generated/prisma';

type UserData = Omit<User,"id">;

export async function getUserEmail(userData:UserData){
    const { email } = userData;

    const result = await prisma.user.findFirst({
        where:{
            email: email
        }
    })

    return result;
}

export async function createUser(userData:UserData){
    const { name, email, password } = userData;
    
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password
        }
    });

    return user;
}