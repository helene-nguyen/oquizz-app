module.exports = {
    
    async auth(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/connexion');
        }
        next();
    }
}