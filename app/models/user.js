const sequelize = require('../database');
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init({
    firstname: DataTypes.TEXT, // Il existe une forme racourrci quand on utilise les params par défaut
    lastname: DataTypes.TEXT,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: "user"
});


module.exports = User;