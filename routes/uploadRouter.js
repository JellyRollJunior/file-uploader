import multer from 'multer';
import { Router } from 'express';
import * as uploadController from '../controllers/uploadController.js';

// Max file size: 100kb
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split('.').pop();
        callback(null, `${file.fieldname}-${file.originalname}-${uniqueSuffix}.${extension}`);
    },
});
const upload = multer({ storage: storage, limits: { fileSize: 100000 } });

const uploadRouter = Router();
uploadRouter.get('/', uploadController.getUpload);
uploadRouter.post('/', upload.single('upload'), (req, res) => {
    console.log(req.file);
    res.redirect('/upload');
});

export { uploadRouter };
