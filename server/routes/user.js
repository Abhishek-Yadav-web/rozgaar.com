const express = require('express');
const { registerUser } = require('../controller/userController');
const router = express.Router();

router.post('/register/user', registerUser)

module.exports = router