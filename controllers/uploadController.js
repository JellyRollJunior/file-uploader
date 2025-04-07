import * as db from '../db/queries.js';
import { v4 as uuidv4 } from 'uuid';

const postUpload = async (req, res, next) => {
    try {
        console.log(req.file);
        const folderId = req.params.folderId;
        const uuid = uuidv4();
        await db.insertFile(
            uuid,
            req.file.originalname,
            uuid,   // placeholder for URL returned from supabase
            Number(req.file.size),
            Number(folderId)
        );
        res.redirect(`/folder/${folderId}`);
    } catch (error) {
        next(error);
    }
};

export { postUpload };
