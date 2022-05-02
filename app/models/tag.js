
// On récupère l'objet de connexion à la BDD + La classe Model pour faire hérité ma classe Level
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');


// Maitenant, tous nos modèles vont hérité du "Model" de sequelize et non plus de CoreModel
class Tag extends Model {}

Tag.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
},{
    sequelize, // Le connecteur
    tableName: 'tag'
});

module.exports = Tag;