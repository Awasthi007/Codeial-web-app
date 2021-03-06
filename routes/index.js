const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
//const authenticator = require('../controllers/authenticator');

router.get('/' , homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
//router.use('/authenticator', require('./authenticator.js'));

router.use('/api', require('./api'));
// for any other routes, access from here
// router.use('/routername',) require('./routerfile));

module.exports = router;