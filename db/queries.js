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

const getChildFolders = databaseHandler(async (parentId) => {
    const folders = await prisma.folder.findMany({
        where: {
            parentId,
        }
    })
    console.log(folders);
    return folders;
}, 'Error retrieving child folders')

const insertFolder = databaseHandler(async (name = 'Untitled folder', parentId = null) => {
    const folder = await prisma.folder.create({
        data: {
            name,
            parentId,
        },
    });
    console.log(folder);
}, 'Error creating folder');

const updateFolder = databaseHandler(async (id, name) => {
    const folder = await prisma.folder.update({
        where: {
            id: id,
        },
        data: {
            name,
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
    getChildFolders,
    insertFolder,
    updateFolder,
    deleteFolder,
};
