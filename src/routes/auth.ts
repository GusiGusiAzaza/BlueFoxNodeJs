import express from 'express';

import * as authController from '../controllers/auth';

const router = express.Router();

router.post('/signup', authController.signupAuth);
router.post('/login', authController.loginAuth);
router.post('/googleLogin', authController.googleLogin);

router.get('/logout', authController.logoutAuth);

export default router;
