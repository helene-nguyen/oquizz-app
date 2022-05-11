//~require models
const Level = require('./level');
const Answer = require('./answer');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');
const QuizHasTag = require('./quizHasTag');

//~associations
//^------------Level - Question
Question.belongsTo(Level, {
    foreignKey: 'level_id',
    as: 'level'
});

Level.hasMany(Question, {
    foreignKey: 'level_id',
    as: 'questions'
});

//^-----------Question - Quiz
Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: 'quiz'
});

Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    as: 'questions'
});

//^-----------Quiz - User
Quiz.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'author'
});

User.hasMany(Quiz, {
    foreignKey: 'user_id',
    as: 'quiz_list'
});

//^-----------Question - Answer
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers'
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
});

Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'good_answer'
});


//^-----------Quiz - Tag
Quiz.belongsToMany(Tag, {
    foreignKey: 'quiz_id',
    through: 'quiz_has_tag',
    otherKey: 'tag_id',
    as: 'tags'
});

Tag.belongsToMany(Quiz, {
    foreignKey: 'tag_id',
    through: 'quiz_has_tag',
    otherKey: 'quiz_id',
    as: 'quiz_list'
});

QuizHasTag.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: 'quiz'
});
QuizHasTag.belongsTo(Tag, {
    foreignKey: 'tag_id',
    as:'tag'
});

Quiz.hasMany(QuizHasTag, {
    foreignKey: 'quiz_id',
    as: 'quiz_id_list'
});

Tag.hasMany(QuizHasTag, {
    foreignKey: 'tag_id',
    as: 'tag_id_list'
});


//~export modules
module.exports = {
    Level,
    Answer,
    Question,
    Quiz,
    Tag,
    User,
    QuizHasTag
};