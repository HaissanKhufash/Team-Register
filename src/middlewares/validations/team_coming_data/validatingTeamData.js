const Joi = require('joi'),
  { namePattern, teamPattern } = {
    // Pattern for names, example María Gutiérrez.
    namePattern: /^[a-záéíóú\s]+$/i,
    // Pattern for team names, example F.C Barcelona
    teamPattern: /^[a-záéíóú.&\s]+$/im,
  },
  createRightSchema = Joi.object({
    team: Joi.string().regex(teamPattern).required(),
    titles: Joi.number().min(0).required(),
    crrMng: Joi.string().regex(namePattern).min(1).required(),
    kitCls: Joi.string().regex(namePattern).min(1).required(),
    userId: Joi.any().required(),
  }),
  updateRightSchema = Joi.object({
    team: Joi.string().regex(teamPattern).required(),
    titles: Joi.number().min(0).required(),
    crrMng: Joi.string().regex(namePattern).min(1).required(),
    kitCls: Joi.string().regex(namePattern).min(1).required(),
  });

function createRight(req, res, next) {
  const { team, titles, crrMng, kitCls } = req.body,
    userId = req.user.id,
    payload = { team, titles, crrMng, kitCls, userId },
    { error } = createRightSchema.validate(payload, { aborEarly: false });

  if (error) {
    req.flash('err_msg', error.details[0].message);
    next(error);
  }

  next();
}

function updateRight(req, res, next) {
  const { team, titles, crrMng, kitCls } = req.body,
    payload = { team, titles, crrMng, kitCls },
    { error } = updateRightSchema.validate(payload, { aborEarly: false });

  if (error) {
    req.flash('err_msg', error.details[0].message);
    next(error);
  }

  next();
}

exports.createRight = createRight;
exports.updateRight = updateRight;
