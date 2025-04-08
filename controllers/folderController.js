import * as db from '../db/queries.js';

const getFolder = async (req, res, next) => {
    try {
        const { folderId } = req.params;
        // if folderId = 0, get files w/ no parent (aka root files), else retrieve with folderId
        const folders =
            folderId == 0
                ? await db.getFoldersByParent(null)
                : await db.getFoldersByParent(Number(folderId));
        const files =
            folderId == 0
                ? await db.getFilesByFolder(null)
                : await db.getFilesByFolder(Number(folderId));
        let folderName = 'My Files'
        if (folderId != 0) {
            const folder = await db.getFolderById(Number(folderId));
            folderName = folder.name;
        }
        res.render('folder', { folderId, folderName, folders, files });
    } catch (error) {
        next(error);
    }
};

const postFolder = async (req, res, next) => {
    try {
        const { folderId } = req.params;
        const parentFolderId = folderId == 0 ? null : folderId;
        const folderName = req.body.folderName;
        await db.insertFolder(folderName, Number(parentFolderId));
        res.redirect(`/folder/${folderId}`);
    } catch (error) {
        next(error);
    }
};

export { getFolder, postFolder };
