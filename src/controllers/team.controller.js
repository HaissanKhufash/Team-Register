const Team = require('../models/Team');

const teamController = {

    renderTeamForm: (req, res) => {

        res.render('./teams/new-team')

    },

    createNewTeam: (req, res) => {

        try {

            const userId = req.user.id,
                { team, titles, crrMng, kitCls } = req.body,
                newTeam = new Team({ team, titles: Number.parseInt(titles), crrMng, kitCls, user: userId, });

            newTeam.save();

            req.flash('success_msg', 'Data has been added successfully');

            res.redirect('/teams');

        } catch (err) {

            req.flash('err_msg', err.message);

            return res.redirect('/teams');

        }

    },

    renderTeams: async (req, res) => {

        try {

            const teamsFound = await Team.find({ user: req.user.id });

            res.render('./teams/get-all-teams', { teams: teamsFound });

        } catch (err) {

            req.flash('err_msg', err.message);

            return res.redirect('/teams');

        }

    },

    renderEditForm: async (req, res) => {

        try {

            const id = req.params.id;

            const teamFound = await Team.findById(id);

            if (teamFound.user != req.user.id) {

                req.flash('err_msg', 'Unauthorized user');

                return res.redirect('/teams');

            }

            res.render('./teams/update-team', { teamFound });

        } catch (err) {

            req.flash('err_msg', err.message);

            return res.redirect('/teams');

        }
    },

    updateTeam: async (req, res) => {

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

    },

    deleteTeam: async (req, res) => {

        try {

            const id = req.params.id;

            const teamFound = await Team.findById(id);

            if (teamFound.user != req.user.id) {

                req.flash('err_msg', 'Unauthorized user');

                return res.redirect('/teams');

            }

            await Team.deleteOne({ _id: id });

            req.flash('success_msg', 'Data has been deleted successfully');

            res.redirect('/teams');

        } catch (err) {

            req.flash('err_msg', err.message);

            return res.redirect('/teams');

        }
    },
};


module.exports = teamController;