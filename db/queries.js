import { PrismaClient } from '@prisma/client';
import { databaseHandler } from './databaseHandler.js';

const prisma = new PrismaClient();

const getUserById = databaseHandler(async (id) => {
    const user = await prisma.user.findFirst({
        where: {
            id: id,
        },
    });
    console.log(user);
    return user;
}, 'Error retrieving user');

const getUserByUsername = databaseHandler(async (username) => {
    const user = await prisma.user.findFirst({
        where: {
            username: username,
        },
    });
    console.log(user);
    return user;
}, 'Error retrieving user');

const insertUser = databaseHandler(async (username, password) => {
    await prisma.user.create({
        data: {
            username,
            password,
        },
    });
}, 'Error inserting user');

export { getUserById, getUserByUsername, insertUser };
