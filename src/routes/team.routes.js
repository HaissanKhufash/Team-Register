const { Router } = require('express'),
  router = Router(),
  teamController = require('../controllers/team.controller'),
  { checkAuthentication } = require('../middlewares/validations/user_path_authentication/checkAuthentication'),
  { createRight, updateRight } = require('../middlewares/validations/team_coming_data/validatingTeamData');

router
  .get('/teams/add', checkAuthentication, teamController.renderTeamForm)

  .post('/teams/new-team', [checkAuthentication, createRight], teamController.createNewTeam)

  .get('/teams', checkAuthentication, teamController.renderTeams)

  .get('/teams/edit/:id', checkAuthentication, teamController.renderEditForm)

  .put('/teams/edit/:id', [checkAuthentication, updateRight], teamController.updateTeam)

  .delete('/teams/delete/:id', checkAuthentication, teamController.deleteTeam);

module.exports = router;
