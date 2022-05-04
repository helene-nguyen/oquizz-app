const errorController = require('../controllers/errorController');

module.exports = {

    async auth(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/connexion');
        }
        next();
    },

    async adminMiddleware(req, res, next) {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return errorController._403(req, res);
        };
        next();
    },

    async userMiddleware(req, res, next) {
        //if any user
        req.session.user ? res.locals.user = req.session.user : res.locals.user = false;
        next();
        // console.log(res.locals.user instanceof User); //expected output false
    }
}