const Team = require('./Team'),
  { authorizate } = require('../helpers/checkAuthorization'),
  teamController = {};

teamController.renderTeamForm = (req, res) => res.render('./team/new-team');

teamController.createNewTeam = (req, res) => {
  try {
    const userId = req.user.id,
      { team, titles, crrMng, kitCls } = req.body,
      newTeam = new Team({
        team,
        titles: Number.parseInt(titles),
        crrMng,
        kitCls,
        user: userId,
      });

    newTeam.save();
    req.flash('success_msg', 'Data has been added successfully');
    res.redirect('/teams');
  } catch (err) {
    req.flash('err_msg', err.message);
    return res.redirect('/teams');
  }
};

teamController.renderTeams = async (req, res) => {
  try {
    const teamsFound = await Team.find({ user: req.user.id });
    res.render('./team/get-all-teams', { teams: teamsFound });
  } catch (err) {
    req.flash('err_msg', err.message);
    return res.redirect('/teams');
  }
};

teamController.renderEditForm = async (req, res) => {
  try {
    const teamFound = await Team.findById(req.params.id),
      comparisonData = { registeredUser: teamFound.user, sessionUser: req.user.id };
    authorizate(comparisonData, req, res);

    res.render('./team/update-team', { teamFound });
  } catch (err) {
    req.flash('err_msg', err.message);
    return res.redirect('/teams');
  }
};

teamController.updateTeam = async (req, res) => {
  try {
    const id = req.params.id,
      { team, titles, crrMng, kitCls } = req.body;
    await Team.findByIdAndUpdate(id, { team, titles, crrMng, kitCls });

    req.flash('success_msg', 'Data has been updated successfully');
    res.redirect('/teams');
  } catch (err) {
    req.flash('err_msg', err.message);
    return res.redirect('/teams');
  }
};

teamController.deleteTeam = async (req, res) => {
  try {
    const teamFound = await Team.findById(req.params.id),
      comparisonData = { registeredUser: teamFound.user, sessionUser: req.user.id };
    authorizate(comparisonData, req, res);

    await Team.deleteOne({ _id: req.params.id });

    req.flash('success_msg', 'Data has been deleted successfully');
    res.redirect('/teams');
  } catch (err) {
    req.flash('err_msg', err.message);
    return res.redirect('/teams');
  }
};

module.exports = teamController;
