//~import modules
const {
    Sequelize,
    Model,
    literal
} = require('sequelize');
//~connect DB
const sequelize = require('./getConnexion')();

class Question extends Model {};

Question.init({
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    question: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    anecdote: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    wiki: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    level_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    answer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quiz_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true
    }  
       
}, {
    sequelize,
    modelName: 'Question',
    tableName: 'question'
});

module.exports = Question;