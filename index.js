//!dotenv
require('dotenv').config();

//~import modules
const express = require('express'),
    app = express(),
    router = require('./app/routers'),
    errorController = require('./app/controllers/errorController');    
    
//~url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//~statics
app.use('/', express.static(__dirname + '/public'));
//~motor
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

//*middlewares
app.use(router);

//*error
app.use(errorController._404);

//*launch app
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running server on http://localhost:${PORT}`);
})