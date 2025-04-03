import { Router } from 'express';
import * as folderController from '../controllers/folderController.js';

const folderRouter = Router();

folderRouter.get('/:folderId', folderController.getFolder);

export { folderRouter };
