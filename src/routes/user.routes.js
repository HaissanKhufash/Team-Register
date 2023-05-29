const { Router } = require('express'),
    router = Router(),
    userController = require('../controllers/user.controller'),
    { signUpValidator } = require('../middlewares/validations/sign_up_coming_data/validatingComingData');

router
    .get('/users/sign-up', userController.renderSignUpForm)

    .post('/users/sign-up', signUpValidator, userController.signUp)

    .get('/users/sign-in', userController.renderSignInForm)

    .post('/users/sign-in', userController.signInLocal)

    .get('/google', userController.signInGoogle)

    .get('/oauth2/redirect/google', userController.googleCallback)

    .get('/users/log-out', userController.logOut)

module.exports = router