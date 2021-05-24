import express from 'express';

import * as testController from '../controllers/tests';
import { adminRoute } from '../middleware/validateAdminRoute';

const router = express.Router();

router.post('/!findAllByThemeId', testController.findAllByThemeId);

router.post('/', adminRoute, testController.create);

router.get('/:testId', testController.findOne);
router.delete('/:testId', adminRoute, testController.remove);

export default router;
