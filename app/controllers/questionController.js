const Question = require("../models/question");

const questionController = {
    all: async (req, res) => {
        // Récupérer tous les niveaux
        const questions = await Question.findAll({});
            
        // res.send(questions);

        res.render('questions/all', { questions })

    },
    get: async (req, res) => {
        // Récupérer un niveau
        const id = Number(req.params.id);

        // Si id différent de NaN
        if(!isNaN(id)) {
            const question = await Question.findByPk(id);
            res.send(question);
            return;
        } 

        res.status(404);
        res.send("Not found");
    },
    getCreate: async (req, res) => {
        res.render('questions/upsert', { question: false });
    },
    doCreate: async (req, res) => {
        const body = req.body;

        try {
            if(req.body) {
                const question = await Question.create(body);
                res.send(question);
            } else {
                res.status(400);
                res.send("Vous devez inclure un body pour créer une question");
            }
    
        } catch(err) {
            res.status(500);
            res.send("Une erreur inatendu s'est produit");
            console.error(err);
        }



    }, 
    getUpdate: async (req, res) => {
           // Récupérer un niveau
           const id = Number(req.params.id);

           // Si id différent de NaN
           if(!isNaN(id)) {
               const question = await Question.findByPk(id);
               res.render('questions/upsert', { question });
               return;
           } 
   
           res.status(404);
           res.send("Not found");
    },
    doUpdate: async(req, res) => {
        // Mettre à jour un niveau

        ICI 
        
    },
    delete: async(req, res) => {
        // Supprimer un niveau
          const id = Number(req.params.id);

          // Si id différent de NaN
          if(!isNaN(id)) {
              const question = await Question.findByPk(id);
              question.destroy();
              res.send("He's gone");
              return;
          } 
  
          res.status(404);
          res.send("Not found");

    }
}

module.exports = questionController;
