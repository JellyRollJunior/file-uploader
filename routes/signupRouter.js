import { Router } from 'express';
import * as signupController from '../controllers/signupController.js';

const signupRouter = Router();

signupRouter.get('/', signupController.getSignup);
signupRouter.post('/', signupController.postSignup);

export { signupRouter };
