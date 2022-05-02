//~import modules
const {
    Sequelize,
    Model,
    literal
} = require('sequelize');
//~import DB
const sequelize = require('./getConnexion')();

class Quiz extends Model {};

Quiz.init({
    //~relations
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    user_id: {
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
    modelName: 'Quiz',
    tableName: 'quiz'
});

module.exports = Quiz;