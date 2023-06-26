const indexController = {
  renderIndex: (req, res) => {
    res.render('./principle/index');
  },

  rederAbout: (req, res) => {
    res.render('./principle/about');
  },
};

module.exports = indexController;
