import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserById = async (id) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: id,
            },
        });
        console.log(user);
        return user;
    } catch (error) {
        throw error;
    }
};

const getUserByUsername = async (username) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        console.log(user);
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const insertUser = async (username, password) => {
    try {
        await prisma.user.create({
            data: {
                username,
                password,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getUserById, getUserByUsername, insertUser };
