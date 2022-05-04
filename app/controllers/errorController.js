const errorController = {
  _401: (req, res) => {
    res.status(401).send("Authentification error");
  },
  _403: (req, res) => {
    res.status(403).render('pages/403');
  },
  _404: (req, res) => {
    res.status(404).render('pages/404');
  },
  _500: (err, req, res) => {
    res.status(500).send(err.message);
  },
};

module.exports = errorController;