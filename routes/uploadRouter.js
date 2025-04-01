import { Router } from 'express';
import * as uploadController from '../controllers/uploadController.js';

const uploadRouter = Router();
uploadRouter.get('/', uploadController.getUpload);

export { uploadRouter };
