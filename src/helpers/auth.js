validateAuth = {
    isAuthenticated: (req, res, next) => {

        if (req.isAuthenticated()) { return next(); }

        req.flash('err_msg', `You're not authenticated, please sign in to access to our content`);

        res.redirect('/users/sign-in');

    },

}

module.exports = validateAuth;