//~import modules
const errorController = require("./errorController");
const {
    Quiz,
    User
} = require('../models/index.js')

//~controller
const searchController = {

    async renderSearchPage(req, res, next) {
        try {
            //TODO: REMOVE after test 
            console.log(req.query.search);
            const search = req.query.search;

            res.render('pages/search', {
                title : "Votre recherche", 
                search
            });
            

        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = searchController;