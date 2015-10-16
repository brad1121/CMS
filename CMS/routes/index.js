var express = require('express');
var Account = require('../models/account');
var router = express.Router();
var CMS_Title = "Node CMS";
module.exports = function (passport) {
    
    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', { title: CMS_Title });
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
            successRedirect: '/dashboard'
        })
    );
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    router.get('/dashboard', function (req, res) {
        if (req.session.passport.user === undefined) { res.redirect('/') }
        else {
            res.render('dashboard', { title: CMS_Title, user: req.user })
        }
    });
    router.get('/user', function (req, res) {
        if (req.session.passport.user === undefined) { res.redirect('/') }
        else {
            res.render('user', { title: CMS_Title, user: req.user })
        }
    });
    
    
    return router;
}