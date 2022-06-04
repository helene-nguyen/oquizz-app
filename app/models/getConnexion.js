//No need to call dotenv when destructure Sequelize
// require('dotenv').config();
//~import modules
const { Sequelize } = require('sequelize');

//~connexion database
function getConnexion() {
    return new Sequelize(
        process.env.DB_DATABASE,
        process.env.DB_USERNAME,
        process.env.DB_PWD,
        {
            
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },

    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENV,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
}

module.exports = getConnexion();
