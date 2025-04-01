import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';
import * as uploadController from '../controllers/uploadController.js';

const uploadRouter = Router();

uploadRouter.get('/', isAuthenticated, uploadController.getUpload);
uploadRouter.post('/', isAuthenticated, upload.single('upload'), uploadController.postUpload);

export { uploadRouter };
