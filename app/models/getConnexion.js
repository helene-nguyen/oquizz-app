//!
require('dotenv').config();
//~import modules
const Sequelize = require('sequelize');

//~connexion database
function getConnexion() {

    return new Sequelize(
        process.env.DB_DATABASE,
        process.env.DB_USERNAME,
        process.env.DB_PWD,

        {
            define: {
                createdAt: "created_at",
                updatedAt: "updated_at"
            },

            host: process.env.DB_HOST,
            dialect: process.env.DB_ENV,
            logging: false
        }
    )
}

module.exports = getConnexion;