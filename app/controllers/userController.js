//~import modules
const errorController = require('./errorController');
const {
    User
} = require('../models');
const bcrypt = require('bcrypt');


//~controller
const userController = {
    async renderSignUpPage(req, res) {
        try {
            res.render('pages/register', {
                title: 'Inscription'
            });
        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    async renderSignInPage(req, res) {
        try {
            res.render('pages/connexion', {
                title: 'Se connecter'
            });
        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async registerUser(req, res) {
        const {
            email,
            password,
            firstname,
            lastname
        } = req.body;

        try {
            //^chiffrage
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            await User.create({
                email,
                password: hash,
                firstname,
                lastname
            });

            res.redirect('/connexion');

        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async renderProfilPage(req, res) {
        try {
            const password = req.body.password;
            //


            res.render('pages/profil', {
                title: 'Mon profil'
            })
        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = userController;