const Joi = require('joi'),
  { namePattern, passwordPattern } = {
    // Pattern for names, example María Gutiérrez.
    namePattern: /^[a-záéíóú\s]+$/i,
    // Pattern for passwords, allows alphanumeric characters or another specified characters at the beggining of the sentence and must follow another characters, like 09Lojdks_#op or ?opjdjsjjds-ks. This is due a password strength question.
    passwordPattern: /^(\w|[/#$?\-.])+[/#$?\-._]+(\w|[/#$?\-.])*$/m,
  },
  signUpSchema = Joi.object({
    name: Joi.string().regex(namePattern).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordPattern).min(8).required(),
    confirmPassword: Joi.ref('password'),
  });

function validator(req, res, next) {
  const { name, email, password, confirmPassword } = req.body,
    payload = { name, email, password, confirmPassword },
    { error } = signUpSchema.validate(payload, { aborEarly: false });

  if (error) {
    req.flash('err_msg', error.details[0].message);
    return res.redirect('/users/sign-up');
  }

  next();
}

exports.signUpValidator = validator;
