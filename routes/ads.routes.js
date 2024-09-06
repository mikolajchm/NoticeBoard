const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils /authMiddleware');

router.get('/ads', AdsController.getAll);
router.get('/ad/:id', AdsController.getId);
router.post('/ad/add',authMiddleware, AdsController.post);
router.delete('/ad/remove/:id',authMiddleware, AdsController.delete);
router.put('/ad/edit/:id',authMiddleware, AdsController.putId);
router.get('/search/:searchParse', AdsController.search);


module.exports = router;