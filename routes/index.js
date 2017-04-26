'use strict';
const router = require('express').Router()
const userController = require('../controllers/userController')
const jwtHelpers = require('../helpers/check_token')
const passport = require('passport')
// const Strategy = require('passport-local').Strategy

router.post('/api/users', jwtHelpers.check_token_admin, userController.insertOne) // admin only
router.get('/api/users', jwtHelpers.check_token_admin, userController.getAll) // admin only

router.post('/api/signup', userController.signup)

router.post('/api/signin', passport.authenticate('local', {
    session: false
}), function(req, res) {
    var user = req.user
    res.send(user)
    // res.send('test')
})

// passport.use(new Strategy(
//     function(username, password, cb) {
//         console.log(username);
//         // request object is now first argument
//         // ...
//         //parameter pertama itu error, yg kedua data yg dibawanya
//         if (username == 'butet' && password == "butet") {
//             cb(null, {
//                 username: "butet"
//             })
//         } else {
//             cb('Username dan password not match')
//         }
//     }
// ));

// router.post('/api/signin', userController.signin)



module.exports = router