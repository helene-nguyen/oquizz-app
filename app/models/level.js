//~import modules
const {
    Sequelize,
    Model,
    literal
} = require('sequelize');
//~connect DB
const sequelize = require('./getConnexion')();

class Level extends Model {};

Level.init({
    //~relations
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT
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
    tableName: 'level'
});

module.exports = Level;