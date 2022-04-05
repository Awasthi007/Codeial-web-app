const express = require('express');
const app = express();
const port = 3000;

const cookieParcer = require('cookie-parser');  // used for writing and reading into the cookies

const expressLayouts = require('express-ejs-layouts');  // this is use for setting the our view engine as ejs
const db = require('./config/mongoose');  // to use our database
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const custoMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());
app.use(cookieParcer());



app.use(express.static('./assets'));  /// to access ourr folder where we have put our css images and js files

app.use(expressLayouts);  // to us the layouts
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setup the view engine

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // todo change the secret before deployement in production mode
    secret: 'blahsomething',
    resave: false,
    cookie: {
        maxAge: (1000*64*100)
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
        },
        function(error)
        {
            console.log(error || 'connect-mongo setup is ok');
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(custoMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(error){
    if(error)
    {
        console.log(`Error in running the server :${error}`);
    }

    console.log(`Server is running on Port : ${port}`);
});