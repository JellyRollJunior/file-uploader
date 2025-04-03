import * as db from '../db/queries.js';

const getFolder = async (req, res) => {
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
    console.log(folders);
    console.log(files);
    res.render('folder', {folders, files});
};

export { getFolder };
