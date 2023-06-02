const indexController = {
  renderIndex: (req, res) => {
    res.render('./partials/index');
  },

  rederAbout: (req, res) => {
    res.render('./partials/about');
  },
};

module.exports = indexController;
