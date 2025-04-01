import { Router } from 'express';
import * as uploadController from '../controllers/uploadController.js';

import multer from 'multer';
// Max file size: 100kb
const upload = multer({ dest: './uploads/', limits: { fileSize: 100000} });

const uploadRouter = Router();
uploadRouter.get('/', uploadController.getUpload);
uploadRouter.post('/', upload.single('uploaded_file'), (req, res) => {
    console.log(req.file);
    res.redirect('/upload');
})

export { uploadRouter };
