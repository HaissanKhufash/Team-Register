const { Router } = require('express'),
    router = Router(),
    indexController = require('../controllers/index.controller');

router
    .get('/', indexController.renderIndex)

    .get('/about', indexController.rederAbout)

module.exports = router;