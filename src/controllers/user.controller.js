const User = require('../models/User'),
  { NODE_ENV } = process.env,
  passport = require('passport');

const userController = {};

userController.renderSignUpForm = (req, res) => res.render('./users/sign-up');

userController.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await new User({ name, email, password });
    await newUser.encryptPassword(password);
    await newUser.save();

    return NODE_ENV === 'test' ? res.send({ message: 'user has been created' }) : res.redirect('/users/sign-in');
  } catch (err) {
    req.flash('err_msg', err.message);
    return res.redirect('/users/sign-up');
  }
};

userController.renderSignInForm = (req, res) => res.render('./users/sign-in');

userController.signInLocal = passport.authenticate('local', {
  failureRedirect: '/users/sign-in',
  successRedirect: '/teams',
  failureFlash: true,
});

userController.signInGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

userController.googleCallback = passport.authenticate('google', {
  failureRedirect: '/users/sign-in',
  successRedirect: '/teams',
});

userController.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash('success_msg', 'Session has been closed');
    res.status(200).redirect('/users/sign-in');
  });
};

module.exports = userController;
