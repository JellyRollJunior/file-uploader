import { v4 as uuidv4 } from 'uuid';
import * as db from '../db/queries.js';
import * as supabase from '../db/supabase.js';

const postUpload = async (req, res, next) => {
    try {
        console.log(req.file);
        const folderId = req.params.folderId;
        const uuid = uuidv4();
        const extension = req.file.originalname.split('.').pop();
        const fullpath = await supabase.uploadFileToSupabase(uuid, extension, req.file.buffer);
        await db.insertFile(
            uuid,
            req.file.originalname,
            fullpath,
            Number(req.file.size),
            Number(folderId)
        );
        res.redirect(`/folder/${folderId}`);
    } catch (error) {
        next(error);
    }
};

export { postUpload };
