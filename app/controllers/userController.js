//~import modules
const errorController = require('./errorController');
const {
    User
} = require('../models');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');


//~controller
const userController = {

    async renderSignUpPage(req, res) {
        try {
            //variables
            const errorPwd = req.session.errorPwd;
            const errorEmail = req.session.errorEmail;
            const errorUserAlreadyExists = req.session.errorUserAlreadyExists;

            //session
            errorPwd === 'Les mots de passe ne sont pas identiques, veuillez recommencer.' ? req.session.errorPwd = '' : errorPwd;

            errorEmail === 'E-mail non valide !' ? req.session.errorEmail = '' : errorEmail;

            errorUserAlreadyExists === `L'utilisateur existe déjà!` ? req.session.errorUserAlreadyExists = '' : errorUserAlreadyExists;

            //render
            res.render('pages/register', {
                title: 'Inscription',
                errorPwd,
                errorEmail,
                errorUserAlreadyExists
            });

        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async renderSignInPage(req, res) {
        try {
            //variables
            const wrongPwd = req.session.wrongPwd;
            const errorEmail = req.session.errorEmail;

            //session
            wrongPwd === 'Vous avez rentré le mauvais mot de passe, veuillez recommencer.' ? req.session.wrongPwd = '' : wrongPwd;

            errorEmail === 'E-mail non valide !' ? req.session.errorEmail = '' : errorEmail;

            //render
            res.render('pages/connexion', {
                title: 'Se connecter',
                wrongPwd,
                errorEmail
            });
        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async registerUser(req, res) {
        try {
            //variables
            const {
                email,
                password,
                passwordConfirm,
                firstname,
                lastname
            } = req.body;

            //check infos
            //^check email
            if (!emailValidator.validate(email)) {
                req.session.errorEmail = 'E-mail non valide !';
                res.redirect('/signup');
                return;
            }

            //TODO  check if it's all ok 
            //^check user DB
            const exists = User.findOne({
                where: {
                    email: email
                },
            });

            if (exists) {
                req.session.errorUserAlreadyExists = `L'utilisateur existe déjà!`
                res.redirect('/signup');
                return;
            };

            //^check password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const hashPwdConfirm = await bcrypt.hash(passwordConfirm, salt);

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

            //send bakc to signup page
            res.redirect('/signup');

        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async renderProfilPage(req, res) {
        try {
            let userRegistered = req.session.userRegistered;

            userRegistered !== undefined ? userRegistered = req.session.userRegistered : userRegistered = '';

            res.render('pages/profil', {
                userRegistered
            });

        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async loginUser(req, res) {
        try {
            //variables
            const {
                email,
                password
            } = req.body;

            //check infos
            //^check email
            if (!emailValidator.validate(email)) {
                req.session.errorEmail = 'E-mail non valide !';
                res.redirect('/connexion');
                return;
            };

            //^check user password
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
                    req.session.userRegistered = userRegistered[0];

                    res.redirect('/profil')

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