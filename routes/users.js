const express  = require('express');

const router = express.Router();
const users_Controller = require('../controllers/users_controller');
const post_Controller = require('../controllers/posts_controller');

router.get('/profile', users_Controller.profile);
router.get('/posts', post_Controller.posts);
router.get('/login', users_Controller.login);
router.get('/signup' ,users_Controller.signup);

module.exports = router;