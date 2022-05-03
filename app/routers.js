//~importmodules
const {
    Router
} = require('express');
const router = Router();
const {
    renderHomePage
} = require('./controllers/mainController');
const {
    renderSignUpPage,
    renderSignInPage,
    registerUser,
    renderProfilPage,
    loginUser,
    logoutUser
} = require('./controllers/userController');
const {
    renderAdminPage
} = require('./controllers/adminController');
const {
    tagList,
    renderQuizListByTag,
    renderQuizGame
} = require('./controllers/quizController.js');
const {
    renderSearchPage
} = require('./controllers/searchController');

//~routers
router.get('/', renderHomePage);
//user
router.get('/signup', renderSignUpPage);
router.get('/connexion', renderSignInPage, loginUser);
router.post('/connexion', registerUser);
router.get('/profil', renderProfilPage);
router.post('/profil', loginUser);
router.get('/logout', logoutUser);
//admin
router.get('/admin', renderAdminPage);
router.post('/admin', renderAdminPage);
//tag
router.get('/tags', tagList);
router.get('/tags/:id', renderQuizListByTag);
//game
router.get('/quiz/:id', renderQuizGame);
//search
router.get('/search', renderSearchPage);
router.post('/search', renderSearchPage);

module.exports = router;