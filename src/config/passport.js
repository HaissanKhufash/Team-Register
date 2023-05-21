const passport = require('passport'),
    localStrategy = require('passport-local'),
    User = require('../models/User'),
    { matchPassword } = require('../validations/password');

async function userValidation(email, password, done) {

    try {

        const foundUser = await User.findOne({ email });

        if (!foundUser) {

            return done(null, false, { message: `${email} isn't registered` });

        } else {

            return (!await matchPassword(password, foundUser.password))
                ? done(null, false, { message: `Invalid password` })
                : done(null, foundUser);

        }

    } catch (err) {

        req.flash('err_msg', err.message);

    }
}

passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password', }, userValidation));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {

    try {

        const foundUser = await User.findById(id);

        done(null, foundUser);

    } catch (err) {

        done(err, null)

    }

});