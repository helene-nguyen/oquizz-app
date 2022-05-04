const errorController = require('../controllers/errorController');

module.exports = {

    async adminMiddleware(req, res, next) {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return errorController._403(req, res);
        };
        next();
    }
}