import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertUser = async (username, password) => {
    try {
        await prisma.user.create({
            data: {
                username,
                password,
            }
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { insertUser }