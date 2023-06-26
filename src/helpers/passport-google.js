const passport = require('passport'),
  googleStrategy = require('passport-google-oauth20').Strategy,
  GoogleUser = require('../user/GoogleUser');

async function userValidation(accessToken, refreshToken, profile, done) {
  try {
    const { emails, displayName } = profile,
      email = emails[0].value,
      source = 'google',
      currentUser = await GoogleUser.findOne({ email });

    if (!currentUser) {
      const newUser = new GoogleUser({ email, displayName });

      await newUser.save();

      return done(null, newUser);
    }

    if (source !== 'google') {
      return done(null, false, {
        message: `You have previously signed up with a different signin method`,
      });
    }

    return done(null, currentUser);
  } catch (err) {
    console.log(err);
  }
}

passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    userValidation
  )
);

passport.serializeUser((user, done) => done(null, user.email));

passport.deserializeUser(async (email, done) => {
  try {
    const foundUser = await GoogleUser.findByEmail({ email }, { displayName: 1, email: 1 });

    done(null, foundUser);
  } catch (err) {
    done(err, null);
  }
});
