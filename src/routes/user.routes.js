const {Router} = require('express'),
    router = Router(),
    userController = require('../controllers/user.controller');

router
    .get('/users/sign-up', userController.renderSignUpForm)

    .post('/users/sign-up', userController.signUp)

    .get('/users/sign-in', userController.renderSignInForm)

    .post('/users/sign-in', userController.signIn)
    
    .get('/users/log-out', userController.logOut)
    
module.exports = router