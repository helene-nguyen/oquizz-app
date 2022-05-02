//~import modules
const {
    Sequelize,
    Model,
    literal
} = require('sequelize');
//~connect DB
const sequelize = require('./getConnexion');

class Tag extends Model {};

Tag.init({
    //~relations
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
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
    modelName: 'Tag',
    tableName: 'tag'
});

module.exports = Tag; 
