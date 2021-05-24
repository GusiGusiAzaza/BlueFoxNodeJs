import express from 'express';

import * as questionsController from '../controllers/questions';
import { adminRoute } from '../middleware/validateAdminRoute';

const router = express.Router();

router.post('/!findAllByTestId', questionsController.findAllByTestId);

router.post('/', adminRoute, questionsController.create);

router.get('/:questionId', questionsController.findOne);
router.put('/:questionId', adminRoute, questionsController.update);
router.delete('/:questionId', adminRoute, questionsController.remove);

export default router;
