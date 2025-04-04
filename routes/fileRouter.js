import { Router } from 'express';
import * as fileController from '../controllers/fileController.js';

const fileRouter = Router();

fileRouter.get('/:fileId', fileController.getFile);
fileRouter.get('/:fileId/download', fileController.getFileDownload);

export { fileRouter };
