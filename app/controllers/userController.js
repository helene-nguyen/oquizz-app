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
            const errorPwd = req.session.errorPwd;

            errorPwd === 'Les mots de passe ne sont pas identiques, veuillez recommencer.' ? req.session.errorPwd = '' : errorPwd;

            res.render('pages/register', {
                title: 'Inscription',
                errorPwd
            });

        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async renderSignInPage(req, res) {
        try {
            const wrongPwd = req.session.wrongPwd;

            wrongPwd === 'Vous avez rentré le mauvais mot de passe, veuillez recommencer.' ? req.session.wrongPwd = '' : wrongPwd;

            res.render('pages/connexion', {
                title: 'Se connecter',
                wrongPwd
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
            const {
                email,
                password
            } = req.body;

            const userRegistered = await User.findAll({
                where: {
                    email
                }
            });

            bcrypt.compare(password, userRegistered[0].password, function (err, result) {
                if (err) {
                    errorController._500(err, req, res);
                }

                if (result) {
                    req.session.wrongPwd = '';
                    res.render('pages/profil', {
                        userRegistered: userRegistered[0]
                    });
                    return;
                }
                // response is OutgoingMessage object that server response http request
                req.session.wrongPwd = 'Vous avez rentré le mauvais mot de passe, veuillez recommencer.';

                return res.redirect('/connexion');
            })
            
        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = userController;