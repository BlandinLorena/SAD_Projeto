//create a login route
// routes/login.js
const express = require('express');
const { login, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/', login);
router.get('/logout', logout);

module.exports = router;
