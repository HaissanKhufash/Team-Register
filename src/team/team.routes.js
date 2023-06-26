const { Router } = require('express'),
  router = Router(),
  teamController = require('./team.controller'),
  { checkAuthentication } = require('../middlewares/validations/checkAuthentication'),
  { createRight, updateRight } = require('../middlewares/validations/validatingTeamData');

router
  .get('/teams/add', checkAuthentication, teamController.renderTeamForm)

  .post('/teams/new-team', [checkAuthentication, createRight], teamController.createNewTeam)

  .get('/teams', checkAuthentication, teamController.renderTeams)

  .get('/teams/edit/:id', checkAuthentication, teamController.renderEditForm)

  .put('/teams/edit/:id', [checkAuthentication, updateRight], teamController.updateTeam)

  .delete('/teams/delete/:id', checkAuthentication, teamController.deleteTeam);

module.exports = router;
