const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Quiz extends Model {}

Quiz.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT
}, {
    sequelize,
    tableName: "quiz"
});

module.exports = Quiz;