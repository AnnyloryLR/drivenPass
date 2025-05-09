import prisma from "../src/database/config";
import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.UUID;
const cryptr = new Cryptr(secretKey);

const encryptedPassword = cryptr.encrypt("demo123");

async function main(){
    await prisma.user.upsert({
        where: {email: "demo@driven.com.br"},
        update: {},
        create:{
            name: "Demo",
            email: "demo@driven.com.br",
            password: encryptedPassword
        }
    })
}

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1)
})