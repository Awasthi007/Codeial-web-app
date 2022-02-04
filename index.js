const express = require('express');
const app = express();
const port = 8000;

const cookieParcer = require('cookie-parser');

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


app.use(express.urlencoded());
app.use(cookieParcer());



app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// use express router
app.use('/', require('./routes'));


//setup the view engine

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(error){
    if(error)
    {
        console.log(`Error in running the server :${error}`);
    }

    console.log(`Server is running on Port : ${port}`);
});