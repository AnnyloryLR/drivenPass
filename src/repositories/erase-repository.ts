import prisma from "../database/config";

export async function eraseAccount(userId:number){

    await prisma.credentials.deleteMany({
        where:{
            userId: userId
        }
    });

    const result = await prisma.users.delete({
        where:{
            id:userId
        }
    })

    return result;
}
