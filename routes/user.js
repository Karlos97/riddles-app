const path = require('path');

const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('/user/add-riddle', usersController.getAddRiddle);

router.post('/user/add-riddle', usersController.postAddRiddle);

router.get('/user/history', usersController.getHistory);

router.post('/user/delete-riddle/:riddleId', usersController.postDeleteRiddle);

router.get('/user/edit-riddle/:riddleId', usersController.getEditRiddle);

router.post('/user/edit-riddle', usersController.postEditRiddle);

router.get('/user/riddle-details/:riddleId', usersController.getRiddleDetails);

module.exports = router;
