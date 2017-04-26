const mongo = require('mongodb')
const User = require('../models/user')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
var methods = {}

methods.insertOne = (req, res, next) => {
    let pwdHash = req.body.password
    User.create({
            username: req.body.username,
            password: passwordHash.generate(pwdHash),
            role: req.body.role
        })
        .then(record => {
            res.json(record)
        })
        .catch(err => {
            res.json({
                err,
                message: 'Error waktu createOne'
            })
        })
} // insertOne

methods.getAll = (req, res, next) => {
    User.find()
        .then(records => {
            res.json(records)
        })
        .catch(err => {
            res.json({
                err,
                message: 'Error waktu getAll Book'
            })
        })
} //getAll

methods.signup = (req, res, next) => {
    let pwdHash = req.body.password

    // console.log(pwdHash);
    User.create({
            username: req.body.username,
            password: passwordHash.generate(pwdHash),
            role: req.body.role
        })
        .then(record => {
            res.json(record)
        })
        .catch(error => {
            res.json({
                error
            })
        })
} // signup

methods.signin = (username, password, next) => {
    User.findOne({
            username: username
        })
        .exec(function(err, record) {
            // console.log(typeof record.password);
            // let pwdHash = password
            if (passwordHash.verify(password, record.password)) {
                // secret itu kata khusus utk mengunci tokennya

                // recordtojson : mengassign data user menjadi object yg baru

                let data = Object.assign({}, record.toJSON())
                // console.log(data);
                // utk delete passwordnya
                // delete data.password
                console.log(record);
                let token = jwt.sign(data, 'secret', {
                    expiresIn: '1h'
                })
                next(null, {
                    message: 'Login is Successful',
                    token
                })
            } else {
                next({
                    message: 'Your password is not match'
                })
            }
        })
} //signin

module.exports = methods