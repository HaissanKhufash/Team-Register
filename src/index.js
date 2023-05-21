require('dotenv').config() // Environment variables are available.

// Initializations
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
    passport = require('passport');

require('./config/passport'); // Run the authentication and algorithm stored in the required module

app
    // Settings
    .set('port', (process.env.PORT || 3000))
    .set('views', viewsDirectory)
    .set('view engine', 'pug')
    // Middlewares
    .use(logger('dev'))
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(methodOverride('_method'))
    .use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
    .use(passport.initialize())
    .use(passport.session())
    .use(flash())

// Global variables
const setSuccessMsg = (req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');

    res.locals.err_msg = req.flash('err_msg');

    res.locals.error = req.flash('error');

    res.locals.user = req.user || null;

    next();
};

app
    .use(setSuccessMsg);

// Routes
app
    .use(indexRoutes)
    .use(userRoutes)
    .use(teamRoutes)

    // Static files
    .use(express.static(publicDirectory));


module.exports = app;