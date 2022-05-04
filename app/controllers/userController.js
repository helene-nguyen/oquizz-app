//~import modules
const errorController = require('./errorController');
const {
    User
} = require('../models');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { user } = require('pg/lib/defaults');


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

            errorUserAlreadyExists === `Utilisateur avec cet e-mail existe déjà!` ? req.session.errorUserAlreadyExists = '' : errorUserAlreadyExists;

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
            const errorRegister = req.session.errorRegister;
            const userCreated = req.session.userCreated;

            //session
            wrongPwd === 'Vous avez rentré le mauvais mot de passe, veuillez recommencer.' ? req.session.wrongPwd = '' : wrongPwd;

            errorRegister === 'E-mail ou mot de passe non valide !' ? req.session.errorRegister = '' : errorRegister;

            userCreated === 'Votre compte a bien été créé' ? req.session.userCreated = '' : userCreated;

            //render
            res.render('pages/connexion', {
                title: 'Se connecter',
                wrongPwd,
                errorRegister,
                userCreated
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
                return res.redirect('/signup');
            }

            //^check user DB
            const exists = await User.findOne({
                where: {
                    email
                },
            });

            if (exists) {
                req.session.errorUserAlreadyExists = `Utilisateur avec cet e-mail existe déjà!`
                return res.redirect('/signup');
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
                req.session.userCreated = 'Votre compte a bien été créé';
                return res.redirect('/connexion');
            }

            req.session.errorPwd = 'Les mots de passe ne sont pas identiques, veuillez recommencer.'

            res.redirect('/signup');

        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async renderProfilPage(req, res) {
        try {
            let userRegistered = req.session.user;
            //ternary operator //todo check with Fredo
            req.session.user && req.session.user.role === 'user' || 'admin' ? res.render('pages/profil', {
                userRegistered
            }) : res.redirect('/connexion');

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
                req.session.errorRegister = 'E-mail ou mot de passe non valide !';
                return res.redirect('/connexion');
            };

            //^check user password
            const userRegistered = await User.findOne({
                where: {
                    email
                },
            });

            if (userRegistered === null) {
                req.session.errorRegister = 'E-mail ou mot de passe non valide !';
                return res.redirect('/connexion');
            };

            bcrypt.compare(password, userRegistered.password, function (err, result) {

                if (err) {
                    errorController._401(err, req, res);
                }

                if (result) {
                    req.session.wrongPwd = '';

                    req.session.user = userRegistered;

                    //todo    OK dataVALUES        
                    delete userRegistered.dataValues.password
                    console.log(req.session.user);
                    
                    req.session.user.role === "admin" ? res.redirect('/admin') : res.redirect('/profil');

                    return;
                }
                // response is OutgoingMessage object that server response http request
                req.session.errorRegister = 'E-mail ou mot de passe non valide !';

                return res.redirect('/connexion');
            });


        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    logoutUser(req, res) {
        //cancel the session
        req.session.user = false;
        res.redirect('/connexion');
    }
}

module.exports = userController;