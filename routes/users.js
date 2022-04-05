const express  = require('express');

const router = express.Router();
const passport = require('passport');


const users_Controller = require('../controllers/users_controller');
const post_Controller = require('../controllers/posts_controller');

router.get('/profile/:id', passport.checkAuthentication, users_Controller.profile);

router.post('/update/:id', passport.checkAuthentication, users_Controller.update);
//router.get('/posts', post_Controller.posts);
router.get('/login', users_Controller.login);
router.get('/signup' ,users_Controller.signup);

router.post('/create', users_Controller.create);
// use passport as a middleware to autheticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/login'},
), users_Controller.createSession);

router.get('/sign-out', users_Controller.destroySession);

module.exports = router;