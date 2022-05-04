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
    renderProfilPage,
    registerUser,
    loginUser,
    logoutUser
} = require('./controllers/userController');
const {
    renderAdminPage
} = require('./controllers/adminController');
const {
    renderQuizListByTag,
    renderQuizGame,
    tagList,
} = require('./controllers/quizController.js');
const {
    renderSearchPage
} = require('./controllers/searchController');
//middleware
const {
    auth,
    adminMiddleware
} = require('./middlewares/');


//~---------------------routers
router.get('/', renderHomePage);
//*user
router.get('/signup', renderSignUpPage);
router.get('/connexion', renderSignInPage, loginUser);
router.post('/connexion', registerUser);
router.get('/profil', auth, renderProfilPage);
router.post('/profil', loginUser);
router.get('/logout', logoutUser);
//*admin
router.get('/admin', adminMiddleware, renderAdminPage);
router.post('/admin', renderAdminPage);
//*tag
router.get('/tags', tagList);
router.get('/tags/:id', renderQuizListByTag);
//*quiz
router.get('/quiz/:id', renderQuizGame);
//*search
router.get('/search', renderSearchPage);
router.post('/search', renderSearchPage);

module.exports = router;