var express = require('express');
var Account = require('../models/account');
var router = express.Router();

module.exports = function (passport) {
    
    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', { title: 'Stanford Marketing' });
    });
       
    router.post('/register', function (req, res) {
        Account.register(new Account({ username : req.body.username }), req.body.password, function (err, account) {
            if (err) {
                return res.render('register', { account : account });
            }
            
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    });
    router.get('/register', function (req, res) {
        res.render('register', {});
    });

    router.post('/login', 
        passport.authenticate('local', {
            failureRedirect: '/',
            successRedirect: '/user'
        })
    );
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/user', function (req, res) {
        if (req.session.passport.user === undefined) { res.redirect('/') }
        else {
            res.render('user', { title: 'Stanford Marketing', user: req.user })
        }
    });
    
    
    return router;
}