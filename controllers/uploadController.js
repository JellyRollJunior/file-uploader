import * as db from '../db/queries.js';
import { v4 as uuidv4 } from 'uuid';

const postUpload = async (req, res, next) => {
    const folderId = req.params.folderId;
    console.log(req.file);
    try {
        await db.insertFile(
            req.file.originalname,
            req.file.originalname,
            'test',
            Number(req.file.size),
            Number(folderId)
        );
    } catch (error) {
        next(error);
    }
    res.redirect(`/folder/${folderId}`);
};

export { postUpload };
