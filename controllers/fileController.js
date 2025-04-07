import * as db from '../db/queries.js';
import * as supabase from '../db/supabase.js';

const getFile = async (req, res, next) => {
    try {
        const fileId = Number(req.params.fileId);
        const file = await db.getFileById(fileId);
        const url = supabase.getSrcUrl(file.url);        
        const downloadUrl = supabase.getFileDownloadUrl(file.url);        
        res.render('file', { file, url, downloadUrl });
    } catch (error) {
        next(error);
    }
};

export { getFile };
