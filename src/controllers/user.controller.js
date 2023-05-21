const User = require('../models/User'),
    { strength, characters, validating } = require('../validations/password'),
    passport = require('passport');

const userController = {

    renderSignUpForm: (req, res) => {

        res.render('./users/sign-up');

    },

    signUp: async (req, res) => {

        try {

            const { name, email, password, verify_password } = req.body;

            if (!validating(password, verify_password)) {

                req.flash('err_msg', `Your passwords don't match`);

                return res.redirect('/users/sign-up');

            }

            if (!strength(password)) {

                req.flash('err_msg', 'You password is too short.');

                return res.redirect('/users/sign-up');

            }

            if (!characters(password)) {

                req.flash('err_msg', 'Your password is too weak, it must include characters like {/.-_$#}');

                return res.redirect('/users/sign-up');

            }

            const newUser = await new User({ name, email, password, });

            await newUser.encryptPassword(password)

            await newUser.save();

            return res.redirect('/users/sign-in')

        } catch (err) {

            req.flash('err_msg', err.message);

            return res.redirect('/users/sign-up');

        }
    },

    renderSignInForm: (req, res) => {

        res.render('./users/sign-in');

    },

    signIn: passport.authenticate('local', { failureRedirect: '/users/sign-in', successRedirect: '/teams', failureFlash: true, }),

    logOut: (req, res) => {

        req.logout(err => {

            if (err) { return next(err); }

            req.flash('success_msg', 'Session has been closed');

            res.redirect('/users/sign-in')
            
        });

    },
};

module.exports = userController;