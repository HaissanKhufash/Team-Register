const { Router } = require('express'),
    router = Router(),
    teamController = require('../controllers/team.controller'),
    { isAuthenticated } = require('../helpers/auth');

router
    .get('/teams/add', isAuthenticated, teamController.renderTeamForm)

    .post('/teams/new-team', isAuthenticated, teamController.createNewTeam)

    .get('/teams', isAuthenticated, teamController.renderTeams)

    .get('/teams/edit/:id', isAuthenticated, teamController.renderEditForm)

    .put('/teams/edit/:id', isAuthenticated, teamController.updateTeam)

    .delete('/teams/delete/:id', isAuthenticated, teamController.deleteTeam)

module.exports = router;