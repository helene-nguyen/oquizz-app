//~import modules
const {
    Sequelize,
    Model,
    literal
} = require('sequelize');
//~connect DB
const sequelize = require('./getConnexion');

class Answer extends Model {};

Answer.init({
    //~relations
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    question_id: {
        type: Sequelize.INTEGER,
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
    modelName: 'Answer',
    tableName: 'answer'
});

module.exports = Answer;