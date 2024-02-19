const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isUserLoggedIn = require('../middlewares/userLoggedIn');
const {getUserValidator, updateUserValidator, validate} = require('../middlewares/request_validators');

router.get('/profile/:id', getUserValidator, validate, isUserLoggedIn, userController.getUser);
router.put('/edit/:id', updateUserValidator, validate, isUserLoggedIn, userController.updateUser);

module.exports = router;


