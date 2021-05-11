import express from 'express';

const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({ ping: 'ok' });
});

export default router;
