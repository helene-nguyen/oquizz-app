const errorController = require('../controllers/errorController');

const adminMiddleware = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return errorController._403(req, res); 
    }
    next();
}

module.exports = adminMiddleware;