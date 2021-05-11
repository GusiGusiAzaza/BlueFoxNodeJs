import express from 'express';

import * as userController from '../controllers/users';

const router = express.Router();

router.get('/:userId', userController.getUser);

router.post('/', userController.createUser);

router.post('/:userId', userController.updateUser);

// router.post('/!search', userController.search);
//
// router.post('/!getMany', userController.getUsersByIds);

export default router;
