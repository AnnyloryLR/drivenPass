import prisma from "../database/config";

export async function eraseAccount(id:string){
    const user_id = Number(id)

    await prisma.credential.delete({
        where:{
            id:user_id
        }
    });

    const result = await prisma.user.delete({
        where:{
            id:user_id
        }
    })

    return result;
}
