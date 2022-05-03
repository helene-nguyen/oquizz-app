const errorController = {
  _401: (req, res) => {
    res.status(401).send("Authentification error");
  },
  _403: (req, res) => {
    res.status(403).send("Access denied");
  },
  _404: (req, res) => {
    res.status(404).render('pages/error', {
      title: `ERROR 404 PAGE NOT FOUND /!\\`
    });
  },
  _500: (err, req, res) => {
    res.status(500).send(err.message);
  },
};

module.exports = errorController;