function authorizate(comparisonData, req, res) {
    const { registeredUser, sessionUser } = comparisonData;

    if (registeredUser != sessionUser) {
        req.flash('err_msg', 'Unauthorized user');
        return res.redirect('/teams');
    }
}

exports.authorizate = authorizate;