import prisma from "../database/config";

export async function eraseAccount(userId:number){

    await prisma.credential.deleteMany({
        where:{
            userId: userId
        }
    });

    const result = await prisma.user.delete({
        where:{
            id:userId
        }
    })

    return result;
}
