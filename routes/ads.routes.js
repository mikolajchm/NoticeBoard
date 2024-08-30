const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils /authMiddleware');

router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getId);
router.post('/ads',authMiddleware, AdsController.post);
router.delete('/ads/:id',authMiddleware, AdsController.delete);
router.put('/ads/:id',authMiddleware, AdsController.putId);
router.get('ads/search/:searchParse', AdsController.search);


module.exports = router;