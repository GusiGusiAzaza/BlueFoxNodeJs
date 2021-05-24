import express from 'express';

import * as userController from '../controllers/users';

const router = express.Router();

router.get('/:userId', userController.findOne);

router.post('/', userController.updateUser);

export default router;
