const { Router } = require('express'),
  router = Router(),
  indexController = require('./index.controller');

router
  .get('/', indexController.renderIndex)

  .get('/about', indexController.rederAbout);

module.exports = router;
