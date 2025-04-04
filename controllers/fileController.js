import path from 'node:path';
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

const getFileDownload = async (req, res, next) => {
    try {
        const fileId = Number(req.params.fileId);
        const file = await db.getFileById(fileId);
        const __dirname = path.resolve();
        const filePath = file.path;
        res.download(`${__dirname}/${filePath}`, file.displayName);
    } catch (error) {
        next(error);
    }
};

export { getFile, getFileDownload };
