//~import modules
const errorController = require('./errorController');

//~controller
const adminController = {
    // Faire une route accessible uniquement aux admin
    async renderAdminPage(req, res) {
        try {
            if (req.session.user) {

                req.session.user.role === 'admin' ? res.render('pages/admin') : errorController._403(`Vous n'êtes pas autorisé à voir cette page !!!!`);
                
                return;
            }

            return res.redirect('/connexion');

        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = adminController;