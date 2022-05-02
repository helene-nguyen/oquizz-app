//~import modules
const {
    Sequelize,
    Model,
    literal
} = require('sequelize');
//~connect DB
const sequelize = require('./getConnexion');

class QuizHasTag extends Model {};

QuizHasTag.init({
    //~relations
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    quiz_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tag_id: {
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
    tableName: 'quiz_has_tag'
});

module.exports = QuizHasTag;