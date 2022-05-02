//~import modules
const {
    Sequelize,
    Model,
    DataTypes,
    Op,
    literal
} = require('sequelize');
//~import DB
const sequelize = require('./getConnexion')();

class User extends Model {};

User.init({
    //~relations
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        /* validate: {
            isEmail: {
                msg: "L'addresse e-mail doit être dans un format valide"
            }
        } */
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    firstname: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    lastname: {
        type: Sequelize.TEXT,
        allowNull: true
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
    tableName: 'user'
});

module.exports = User;