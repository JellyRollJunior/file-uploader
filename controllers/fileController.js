import * as db from '../db/queries.js';

const getFile = async (req, res, next) => {
    try {
        const fileId = Number(req.params.fileId);
        const file = await db.getFileById(fileId);
        res.render('file', { file });
    } catch (error) {
        next(error);
    }
};

export { getFile };
