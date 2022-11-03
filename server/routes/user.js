const express = require('express');
const { registerUser, activateAccount } = require('../controller/userController');
const router = express.Router();

router.post('/register/user', registerUser);
router.post('/account/activate/:token', activateAccount );

module.exports = router