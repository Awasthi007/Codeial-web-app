const express  = require('express');

const router = express.Router();

const authenticator = require('../controllers/authenticator');

router.get('/login', authenticator.login);

module.exports = router;