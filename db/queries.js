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

const getFolderById = databaseHandler(async (id) => {
    const folder = await prisma.folder.findFirst({
        where: {
            id: id,
        },
    });
    console.log(folder);
    return folder;
}, 'Error retrieving folder');

const insertFolder = databaseHandler(async (folderName = 'Untitled folder') => {
    const folder = await prisma.folder.create({
        data: {
            name: folderName,
        },
    });
    console.log(folder);
}, 'Error creating folder');

const updateFolder = databaseHandler(async (id, folderName) => {
    const folder = await prisma.folder.update({
        where: {
            id: id,
        },
        data: {
            name: folderName,
        },
    });
    console.log(folder);
});

const deleteFolder = databaseHandler(async (id) => {
    await prisma.folder.delete({
        where: {
            id: id,
        },
    });
}, 'Error deleting folder');

export {
    getUserById,
    getUserByUsername,
    insertUser,
    getFolderById,
    insertFolder,
    updateFolder,
    deleteFolder,
};
