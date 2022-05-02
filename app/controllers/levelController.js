const Level = require("../models/level");

const levelController = {

    all: async (req, res) => {
        // Récupérer tous les niveaux
        const levels = await Level.findAll();
            
        res.render('levels/all', { levels });

    },
    get: async (req, res) => {
        // Récupérer un niveau
        const id = Number(req.params.id);

        // Si id différent de NaN
        if(!isNaN(id)) {
            const level = await Level.findByPk(id);
            res.send(level);
            return;
        } 

        res.status(404);
        res.send("Not found");
    },
    // L'action qui sert pour afficher le formulaire
    getCreate: async (req, res) => {
        // J'effectue le rendu du formulaire
        res.render('levels/upsert', { level: false });
    },
    // L'action qui sert à inserer le resultat du formulaire en base
    doCreate: async (req, res) => {
        // Idéalement on le protege par des try/catch cf. Question

        // On récupère le corps de la requete contenant les valeurs du forulaire
        const formData = req.body;


        // J'utilise mon model Level pour effectuer la création de la ligne en base de  donnée
        const level = await Level.create(formData);

        // J'affiche ensuite la page d'edition avec mon niveau.

        // /!\ res.render attend un objet si on renvoi level sans {} 
        // on renvoi directement le contenu du niveau et non un objet contennant le niveau
        // res.render('levels/upsert', { level });
        res.redirect('/levels');
    }, 
    getUpdate: async(req, res) => {        
        // Idéalement un try catch ici aussi

        // Récupérer un niveau
        // Je récupère l'id depuis l'url (cf. S3)
        const id = Number(req.params.id);

        // Si id différent de NaN (cf. O'Code)
        if(!isNaN(id)) {
            // Pour pouvoir pré-remplir le formulaire d'edition j'ai besoin de récupérer
            // les valeurs du niveau correspondant à l'id dans la base de donnée
            // encore une fois grâce à mon model
            const level = await Level.findByPk(id);

            // Une fois l'instance récupérée et créee je le renvoi à la vue (cf MVC )
            res.render('levels/upsert', { level });
            return;
        } 

        // Dans le cas ou ça foire j'affiche un petit 404
        res.status(404);
        res.send("Not found");
        
    },
    doUpdate: async(req, res) => {
        // Mettre à jour un niveau
        
        // Pour pouvoir faire la mise à jour j'ai besoin de deux choses
        // l'id : Quel niveau dois-je mettre à jour ?
        // body : Les informations que je dois mettre à jour

        const id = Number(req.params.id);
        const body = req.body; 

        try {

            // J'utilise la fonction update de sequelize (cf. doc) pour mettre à jour mon objet
            await Level.update(body, { where: { id }});
            // Une fois fini je redirge vers la liste de tous les niveau

            res.redirect('/levels');
        } catch(err) {
            // ça a foirée
            res.status(500);
            res.send("Something went wrong");
            console.error(err);
        }


        
    },
    getDelete: async (req, res) => {
        res.render('levels/delete');
    },
    doDelete: async(req, res) => {
        // Supprimer un niveau
          const id = Number(req.params.id);

          // Si id différent de NaN
          if(!isNaN(id)) {
              const level = await Level.findByPk(id);
              level.destroy();
              res.redirect('/levels');
              return;
          } 
  
          res.status(404);
          res.send("Not found");

    }
}

module.exports = levelController;