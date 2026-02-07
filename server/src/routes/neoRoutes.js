import express from 'express';
import { getFeed, getLookup, getSummary } from '../controllers/neoController.js';

const router = express.Router();

router.get('/feed', getFeed);
router.get('/summary', getSummary);
router.get('/lookup/:id', getLookup);

export default router;
