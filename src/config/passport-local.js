const passport = require('passport'),
  localStrategy = require('passport-local'),
  User = require('../models/User');

async function userValidation(email, password, done) {
  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return done(null, false, { message: `${email} isn't registered` });
    } else {
      return !(await foundUser.matchPasswords(password, foundUser.password))
        ? done(null, false, { message: `Invalid password` })
        : done(null, foundUser);
    }
  } catch (err) {
    return err;
  }
}

passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, userValidation));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const foundUser = await User.findById(id, { email: 1, name: 1 });
    done(null, foundUser);
  } catch (err) {
    done(err, null);
  }
});
