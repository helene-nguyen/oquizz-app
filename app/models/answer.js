const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Answer extends Model {}

Answer.init({
    description: DataTypes.STRING
}, {
    sequelize,
    tableName: "answer"
});

module.exports = Answer;