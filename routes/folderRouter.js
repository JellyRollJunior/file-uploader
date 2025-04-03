import { Router } from 'express';
import * as folderController from '../controllers/folderController.js';

const folderRouter = Router();

folderRouter.get('/', folderController.getFolder);

export { folderRouter };
