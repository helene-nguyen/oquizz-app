//~importmodules
const { Router } = require('express');
const router = Router();
const { renderHomePage } = require('./controllers/mainController');
const { renderSignUpPage, renderSignInPage, registerUser, renderProfilPage } = require('./controllers/userController');
const { tagList, renderQuizListByTag, renderQuizGame } = require('./controllers/quizController.js');

//~routers
router.get('/', renderHomePage);
//user
router.get('/signup', renderSignUpPage);
router.get('/connexion', renderSignInPage);
router.post('/connexion', registerUser);
router.post('/profil', renderProfilPage);
//tag
router.get('/tags', tagList);
router.get('/tags/:id', renderQuizListByTag);
//game
router.get('/quiz/:id', renderQuizGame);

module.exports = router;