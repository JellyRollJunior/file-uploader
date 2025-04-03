import * as db from '../db/queries.js';

const postUpload = async (req, res, next) => {
    const folderId = req.params.folderId;
    console.log(req.file);
    try {
        db.insertFile(
            req.file.filename,
            req.file.originalname,
            req.file.path,
            Number(req.file.size),
            Number(folderId),
        );
    } catch (error) {
        next(error);
    }
    res.redirect(`/folder/${folderId}`);
};

export { postUpload };
