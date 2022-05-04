module.exports = {
    
    async userMiddleware(req, res, next) {
        //if any user
        req.session.user ? res.locals.user = req.session.user : res.locals.user = false;
        next();

        // console.log(res.locals.user instanceof User); //expected output false
    }
};