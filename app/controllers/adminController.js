//~import modules
const errorController = require('./errorController');

//~controller
const adminController = {

    async renderAdminPage(req, res) {
        try {
            req.session.user && req.session.user.role === 'admin' ? res.render('pages/admin') : res.redirect('/connexion');

            /* if (req.session.user) {

                req.session.user.role === 'admin' ? res.render('pages/admin') : errorController._403(`Vous n'êtes pas autorisé à voir cette page !!!!`);       
                return;
            }

            return res.redirect('/connexion'); */

        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = adminController;