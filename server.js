const express = require('express')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var User = require('./models/user')
var controler = require('./controllers/userController')
const jwt = require('jsonwebtoken')

const app = express()
app.use(require('body-parser').urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost/authpassport');

passport.use(new Strategy(controler.signin));

app.use(passport.initialize());

app.use('/', require('./routes'))

app.listen(3000)