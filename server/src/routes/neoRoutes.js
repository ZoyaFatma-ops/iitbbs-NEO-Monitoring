const express = require('express');
const { getFeed, getLookup, getSummary } = require('../controllers/neoController');

const router = express.Router();

router.get('/feed', getFeed);
router.get('/summary', getSummary);
router.get('/lookup/:id', getLookup);

module.exports = router;
