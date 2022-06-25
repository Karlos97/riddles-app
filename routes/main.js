const path = require('path');

const express = require('express');

const mainController = require('../controllers/main');

const router = express.Router();

router.get('/', mainController.getHome);

router.get('/about', mainController.getAbout);

router.get('/example/:riddleId', mainController.getExample);

router.get('/example', mainController.getExample);

router.post('/check-answer', mainController.postCheckAnswer);

router.get('/check-answer/:riddleId', mainController.getCheckAnswer);


module.exports = router;
