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
            const quiz = await Quiz.findByPk(quizId);
            
            const tags = await Tag.findAll({
                include: {
                    association: 'tag_id_list',
                    include: [{
                        association: 'quiz'
                    }],
                    where: {
                        quiz_id: quizId
                    }
                }
            })

            let quizByLevel = await Quiz.findAll({
                include: {
                    association: 'questions',
                    include: ['level', 'answers'],
                    where: {
                        quiz_id: quizId
                    },
                }
            });

            quizByLevel.forEach(element => {
                quizByLevel = element.questions;
            });

            res.render('pages/quiz', {
                tags,
                quiz,
                quizByLevel
            });
        } catch (err) {
            errorController._500(err, req, res);
        }
    }
};

module.exports = quizController;