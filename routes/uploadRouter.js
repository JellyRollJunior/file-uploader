import { Router } from 'express';
import * as uploadController from '../controllers/uploadController.js';

import multer from 'multer';
const upload = multer();

const uploadRouter = Router();
uploadRouter.get('/', uploadController.getUpload);
uploadRouter.post('/', upload.single('uploaded_file'), (req, res) => {
    console.log(req.file);
    res.redirect('/upload');
})

export { uploadRouter };
