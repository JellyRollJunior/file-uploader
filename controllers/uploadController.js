import * as db from '../db/queries.js';
import * as supabase from '../db/supabase.js';

const postUpload = async (req, res, next) => {
    try {
        console.log(req.file);
        const folderId = req.params.folderId;
        const fullpath = await supabase.uploadFileToSupabase(req.file);
        await db.insertFile(
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
