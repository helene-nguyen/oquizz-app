const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Question extends Model {}

Question.init({
    question: DataTypes.TEXT,
    anecdote: DataTypes.TEXT,
    wiki: DataTypes.TEXT,
}, {
    sequelize,
    tableName: "question"
});

module.exports = Question;