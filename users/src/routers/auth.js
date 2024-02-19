const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const {loginValidator, registerValidator, validate} = require('../middlewares/request_validators');

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post('/logout', authController.logout);

module.exports = router;


