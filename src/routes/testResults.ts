import express from 'express';

import * as testResultsController from '../controllers/testResults';

const router = express.Router();

router.post('/!findAllByUserId', testResultsController.findAllByUserId);

router.post('/', testResultsController.create);

router.get('/:testResultId', testResultsController.findOne);

export default router;
