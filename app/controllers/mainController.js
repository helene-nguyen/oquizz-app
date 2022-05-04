//~import modules
const errorController = require("./errorController");
const {
    Quiz,
    User
} = require('../models/index.js');
const { Sequelize, Op } = require('sequelize');

//~controller
const mainController = {

    async renderHomePage(req, res) {
        try {
            const quizList = await Quiz.findAll({
                include: [{
                    association: 'author',
                    attributes: {
                        exclude: ['email', 'password', 'created_at', 'updated_at'],
                    }
                }],
                order: [
                    ['title', 'ASC']
                ],
                attributes: {
                    exclude: ['user_id', 'created_at', 'updated_at']
                }
            });

            res.render('pages/home', {
                quizList
            });

        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = mainController;