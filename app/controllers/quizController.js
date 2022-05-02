//~import modules
const clc = require('cli-color');
const errorController = require('./errorController');
const {
    Tag,
    Quiz,
    User,
    Question,
    Answer,
    Level
} = require('../models');

//~controller
const quizController = {

    async tagList(req, res) {
        try {

            const tags = await Tag.findAll();

            res.render('pages/tags', {
                title: 'Sujets',
                tags
            })
        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async renderQuizListByTag(req, res) {
        try {
            const tagId = req.params.id
            const tag = await Tag.findByPk(tagId);

            const quizByTag = await Quiz.findAll({
                include: {
                    association: 'quiz_id_list',
                    include: [{
                        association: 'tag'
                    }],
                    where: {
                        tag_id: tagId
                    }
                }
            });

            res.render('pages/tag', {
                title: tag.name,
                quizByTag
            })
        } catch (err) {
            errorController._500(err, req, res)
        }
    },

    async renderQuizGame(req, res) {
        try {
            const quizId = req.params.id;

            const quiz = await Quiz.findByPk(quizId, {
                include: [{
                        association: 'questions', //alias in index.js
                        include: ['level', {
                            model: Answer,
                            as: 'answers',
                            attributes: ['id', 'description']
                        }]
                    },
                    {
                        model: Tag,
                        as: 'tags',
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: 'author',
                        attributes: ['firstname', 'lastname']
                    }
                ]
            });

            // res.json(quiz);

            res.render('pages/quiz', {
                quiz
            });

        } catch (err) {
            errorController._500(err, req, res);
        }
    }
};

module.exports = quizController;