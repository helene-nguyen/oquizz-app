//! on crée ce mw pour nous permettre de vérifier si on a un utilisateur en cours

const userMiddleware = (req, res, next) => {
    //on dit d'abord qu'il n'y a pas d'user
    res.locals.user = false;

    if (req.session.user) { //s'il y a un utilisateur, on le rend disponible partout
        res.locals.user = req.session.user;
    }

    next();
}

module.exports = userMiddleware;