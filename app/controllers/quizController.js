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
            const tags = await Tag.findAll({
                order: ['name']
            });

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
            const tagId = parseInt(req.params.id, 10)
            // console.log(typeof tagId);

            /* if (isNaN(id)) {
                throw new Error('Problème avec tagId'); 
            } */
            const tag = await Tag.findByPk(tagId);

            const quizByTag = await Quiz.findAll({
                order: ['title'],
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

            // res.json(quizByTag);

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
                        association: 'questions', //alias in index.js or model: Question
                        include: ['level', { //include 2 tables
                            model: Answer,
                            as: 'answers',
                            attributes: ['id', 'description'] //what we want
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

            let answers = req.session.answers;
            delete req.session.answers;

            res.render('pages/quiz', {
                quiz,
                answers
            });

        } catch (err) {
            errorController._500(err, req, res);
        }
    },

    async quizPlay(req, res) {
        const quizId = req.params.id;

        const quiz = await Quiz.findByPk(quizId, {
            include: [{
                    association: 'questions', //alias in index.js or model: Question
                    include: ['level', { //include 2 tables
                        model: Answer,
                        as: 'answers',
                        attributes: ['id', 'description'] //what we want
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

        //^locals
        req.session.quizInfos = quiz;

        const userAnswers = [];
        const goodAnswers = [];

        let goodAnswersCount = 0;
        let wrongAnswersCount = 0;

        for (const [key, value] of Object.entries(req.body)) {

            const question = await Question.findByPk(key, {
                include: ['good_answer', 'answers']
            });

            const wrongAnswers = await Answer.findByPk(value, {
                where: {
                    id: value
                }
            });

            /* if (Number(value) === question.good_answer.id) {
                goodAnswersCount++;
                resultQuiz.push(`${question.question} ${question.good_answer.description} est la bonne réponse`)
            } else {
                wrongAnswersCount++
                resultQuiz.push(`${question.question} Tu as choisi ${wrongAnswers.description} et c'est faux !`);
            } */

            Number(value) === question.good_answer.id ? (goodAnswersCount++, goodAnswers.push(question.good_answer.description)) : (wrongAnswersCount++, userAnswers.push(wrongAnswers.description));

            /* Number(value) === question.good_answer.id ? goodAnswers.push(question.good_answer.description) : userAnswers.push(wrongAnswers.description); */

            req.session.answers = {
                goodAnswersCount,
                wrongAnswersCount,
                userAnswers,
                goodAnswers
            };

            req.session.lastAnswers = {
                goodAnswersCount,
                wrongAnswersCount
            };

        }

        res.redirect(`/quiz/${quizId}`);

    }
};

module.exports = quizController;