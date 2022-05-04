const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/connexion');
    }
    next();
}

module.exports = auth;