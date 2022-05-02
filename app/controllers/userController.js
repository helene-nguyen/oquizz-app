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
            const errorpwd = req.session.errorPwd;

            errorpwd === 'Les mots de passe ne sont pas identiques, veuillez recommencer.' ? req.session.errorPwd = '' : errorpwd; 

            res.render('pages/register', {
                title: 'Inscription',
                errorpwd: errorpwd === '' ? '' : errorpwd
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
            passwordConfirm,
            firstname,
            lastname
        } = req.body;

        try {
            //^chiffrage
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const hashPwdConfirm = await bcrypt.hash(passwordConfirm, salt)

            if (hash === hashPwdConfirm) {
                await User.create({
                    email,
                    password: hash,
                    passwordConfirm: hashPwdConfirm,
                    firstname,
                    lastname
                });
                req.session.errorPwd = '';

                res.redirect('/connexion');
                return;
            }

            req.session.errorPwd = 'Les mots de passe ne sont pas identiques, veuillez recommencer.'

            res.redirect('/signup');

        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async renderProfilPage(req, res) {
        try {
            const signInPassword = req.body.password;
            //bcrypt.compare(signInPassword)

            res.render('pages/profil', {
                title: 'Mon profil'
            })
        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = userController;