const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');

router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getId);
router.post('/ads', AdsController.post);
router.delete('/ads/:id', AdsController.delete);
router.put('/ads/:id', AdsController.putId);
router.get('ads/search/:searchParse', AdsController.search);


module.exports = router;