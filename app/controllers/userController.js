//~import modules
const errorController = require("./errorController");
const { User } = require("../models");
//security
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const assert = require("assert");
const passwordValidator = require("password-validator");
const schema = new passwordValidator();
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .symbols(1) // Must have at least 1 symbol
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "123456"]); // Blacklist these values

//~controller
const userController = {
  async renderSignUpPage(req, res) {
    try {
      //variables
      const errorPwd = req.session.errorPwd;
      const errorEmail = req.session.errorEmail;
      const errorUserAlreadyExists = req.session.errorUserAlreadyExists;
      const notValidPwd = req.session.notValidPwd;

      //session
      errorPwd === "Les mots de passe ne sont pas identiques, veuillez recommencer." ? (req.session.errorPwd = "") : errorPwd;

      errorEmail === "E-mail non valide !" ? (req.session.errorEmail = "") : errorEmail;

      errorUserAlreadyExists === `Utilisateur avec cet e-mail existe déjà!` ? (req.session.errorUserAlreadyExists = "") : errorUserAlreadyExists;

      notValidPwd ===
      `Votre mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, 2 chiffres, un symbole, pas d'espace et je sais que c'est plein de restictions mais c'est la loi alors on ne discute pas 😝`
        ? (req.session.notValidPwd = "")
        : notValidPwd;

      //render
      res.render("pages/register", {
        title: "Inscription",
        errorPwd,
        errorEmail,
        errorUserAlreadyExists,
        notValidPwd
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
      wrongPwd === "Vous avez rentré le mauvais mot de passe, veuillez recommencer." ? (req.session.wrongPwd = "") : wrongPwd;

      errorRegister === "E-mail ou mot de passe non valide !" ? (req.session.errorRegister = "") : errorRegister;

      userCreated === "Votre compte a bien été créé" ? (req.session.userCreated = "") : userCreated;

      //render
      res.render("pages/connexion", {
        title: "Se connecter",
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
      const { email, password, passwordConfirm } = req.body;

      //^email
      if (!emailValidator.validate(email)) {
        req.session.errorEmail = "E-mail non valide !";
        return res.redirect("/signup");
      }

      //^user DB
      const exists = await User.findOne({
        where: {
          email
        }
      });

      if (exists) {
        req.session.errorUserAlreadyExists = `Utilisateur avec cet e-mail existe déjà!`;
        return res.redirect("/signup");
      }

      //^password //review caracteres + error Handler
      if (schema.validate(password)) {
        return (req.session.notValidPwd = `Votre mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, 2 chiffres, un symbole, pas d'espace et je sais que c'est plein de restictions mais c'est la loi alors on ne discute pas 😝`);
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const hashPwdConfirm = await bcrypt.hash(passwordConfirm, salt);

      if (hash === hashPwdConfirm) {
        await User.create({
          ...req.body,
          password: hash,
          passwordConfirm: hashPwdConfirm
        });

        req.session.errorPwd = "";
        req.session.userCreated = "Votre compte a bien été créé";
        return res.redirect("/connexion");
      }

      req.session.errorPwd = "Les mots de passe ne sont pas identiques, veuillez recommencer.";

      res.redirect("/signup");
    } catch (err) {
      errorController._500(err, req, res);
    }
  },

  async renderProfilPage(req, res) {
    try {
      let userRegistered = req.session.user;
      let quizInfos = req.session.quizInfos;
      let answers = req.session.lastAnswers;

      (req.session.user && req.session.user.role === "user") || "admin"
        ? res.render("pages/profil", {
            userRegistered,
            quizInfos,
            answers
          })
        : res.redirect("/connexion");
    } catch (err) {
      errorController._500(err, req, res);
    }
  },

  async loginUser(req, res) {
    try {
      //variables
      const { email, password } = req.body;

      //^email
      if (!emailValidator.validate(email)) {
        req.session.errorRegister = "E-mail ou mot de passe non valide !";
        return res.redirect("/connexion");
      }

      //^user password
      const userRegistered = await User.findOne({
        where: {
          email
        }
      });

      if (userRegistered === null) {
        req.session.errorRegister = "E-mail ou mot de passe non valide !";
        return res.redirect("/connexion");
      }

      bcrypt.compare(password, userRegistered.password, function(err, result) {
        if (err) {
          errorController._401(err, req, res);
        }

        if (result) {
          req.session.wrongPwd = "";
          req.session.user = userRegistered;

          delete userRegistered.dataValues.password;

          req.session.user.role === "admin" ? res.redirect("/admin") : res.redirect("/profil");

          return;
        }
        // response is OutgoingMessage object that server response http request
        req.session.errorRegister = "E-mail ou mot de passe non valide !";

        return res.redirect("/connexion");
      });
    } catch (err) {
      errorController._500(err, req, res);
    }
  },

  logoutUser(req, res) {
    //cancel the session
    // req.session.user = false;
    req.session.destroy();
    res.redirect("/connexion");
  }
};

module.exports = userController;
