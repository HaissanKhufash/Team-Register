const { Schema, model } = require('mongoose'),
  teamSchema = new Schema({
    team: { type: String, required: true },
    titles: { type: Number, required: true },
    crrMng: { type: String, required: true },
    kitCls: String,
    classRiv: Array,
    user: { type: String, required: true },
  });

const Team = model('Team', teamSchema);

module.exports = Team;