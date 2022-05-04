//! on crée ce mw pour nous permettre de vérifier si on a un utilisateur en cours
const userMiddleware = (req, res, next) => {
    //if any user
    req.session.user ? res.locals.user = req.session.user : res.locals.user = false;
    next();
}

module.exports = userMiddleware;