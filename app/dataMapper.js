const client = require('./database');
const Level = require('./models/level');

const dataMapper = {
    // je récupère tous les levels et je les retourne
    // PROBLEM : J'récupère pas des objets de type Level
    // getAllLevels: async () => {
    //     try {
    //         return await client.query('SELECT * FROM level');
    //     } catch(err) {
    //         console.error(err);
    //         return null;
    //     }
    // },
    getAllLevels: async () => {
        try {
            // Je récupère le resultat de ma requete
            const result = await client.query('SELECT * FROM level');

            // Je crée un tableau vide
            const levels = [];

            // Pour chaque "ligne" de bdd je convertis en Level
            for(let obj of result.rows ) {
                const l = new Level(obj);
                levels.push(l);
            }

            // je retourne mon nouveau tableau
            return levels;


            // .map -> convertir un tableau de type A vers un nouveau tableau de type B 
            // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
            // return result.rows.map(obj => new Level(obj));


        } catch(err) {
            console.error(err);
            return null;
        }
    },
    getOneLevel: async (id) => {
        // requeté la BDD pour un élément
        try {
            // const sql = {
            //     text: `SELECT * FROM "level" WHERE id=$1`,
            //     values: [id]
            // }
            // const result = await client.query(sql);

            const result = await client.query(`SELECT * FROM "level" WHERE id=$1`,[id]);

            const level = new Level(result.rows[0]);

            return level;
        } catch(err) {

        }

        // retourner un objet de type Level
    }
}

module.exports = dataMapper;