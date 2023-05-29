require('dotenv').config()

const express = require('express'),
    app = express(),
    logger = require('morgan'),
    { join } = require('path'),
    viewsDirectory = join(__dirname, '/views'),
    publicDirectory = join(__dirname, '/public'),
    indexRoutes = require('./routes/index.routes'),
    teamRoutes = require('./routes/team.routes'),
    userRoutes = require('./routes/user.routes'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    { globalize } = require('./middlewares/globalizeInfo/localEnvironment'),
    passport = require('passport');

require('./database');
require('./config/passport-local');
require('./config/passport-google');

app
    .set('port', (process.env.PORT || 3000))

    .set('views', viewsDirectory)

    .set('view engine', 'pug')

    .use(logger('dev'))

    .use(express.urlencoded({ extended: false }))

    .use(express.json())

    .use(methodOverride('_method'))

    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    }))

    .use(passport.initialize())

    .use(passport.session())

    .use(flash())

    .use(globalize)

    .use(indexRoutes)

    .use(userRoutes)

    .use(teamRoutes)

    .use(express.static(publicDirectory));


module.exports = app;