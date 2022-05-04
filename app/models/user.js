//~import modules
const {
    Sequelize,
    Model,
    DataTypes,
    Op,
    literal
} = require('sequelize');
//~import DB
const sequelize = require('./getConnexion');

class User extends Model {/*accessible que si on a une instance d'utilisateur*/};

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
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    firstname: {
        type: Sequelize.TEXT,
        allowNull: true,

    },
    lastname: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    fullname: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstname} ${this.lastname}`;
        }
    },
    role: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'user'
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