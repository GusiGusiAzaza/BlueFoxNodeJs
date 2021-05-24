import express from 'express';

import * as themesController from '../controllers/themes';
import { adminRoute } from '../middleware/validateAdminRoute';

const router = express.Router();

router.post('/', adminRoute, themesController.create);

router.get('/!findAll', themesController.findAll);

export default router;
