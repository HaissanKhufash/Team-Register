const globalize = (req, res, next) => {
  const FLASH_MESSAGES = {
    successMsg: req.flash('success_msg'),
    errMsg: req.flash('err_msg'),
    authError: req.flash('error'),
  };

  res.locals.success_msg = FLASH_MESSAGES.successMsg;
  res.locals.err_msg = FLASH_MESSAGES.errMsg;
  res.locals.error = FLASH_MESSAGES.authError;
  res.locals.user = req.user || null;

  next();
};

exports.globalize = globalize;
