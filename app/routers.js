const express = require('express');
const levelController = require('./controllers/levelController');
const mainController = require('./controllers/mainController');
const questionController = require('./controllers/questionController');

const router = express.Router();

router.get('/', mainController.homePage);

router.get('/questions', questionController.all);
router.get('/questions/create', questionController.getCreate);
router.post('/questions/create', questionController.doCreate);
router.get('/questions/edit/:id', questionController.getUpdate);
router.post('/questions/edit/:id', questionController.doUpdate);
router.get('/questions/delete/:id', questionController.delete);


router.get('/levels', levelController.all);
router.get('/levels/create', levelController.getCreate);
router.post('/levels/create', levelController.doCreate);

router.get('/levels/edit/:id', levelController.getUpdate);
router.post('/levels/edit/:id', levelController.doUpdate);

router.get('/levels/delete/:id', levelController.getDelete);
router.post('/levels/delete/:id', levelController.doDelete);

router.get('/levels/:id', levelController.get);

module.exports = router;