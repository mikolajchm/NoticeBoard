const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils /authMiddleware');
const imageUpload = require('../utils /imageUpload');

router.get('/ad', AdsController.getAll);
router.get('/ad/:id', AdsController.getId);
router.post('/ad/add', authMiddleware, imageUpload.single('photo'), AdsController.post);
router.delete('/ad/remove/:id',authMiddleware, AdsController.delete);
router.put('/ad/edit/:id',authMiddleware, AdsController.putId);
router.get('/search/:searchParse', AdsController.search);


module.exports = router;