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
    router.get('/dashboard/pages', function (req, res) {
        var page_data = require('../models/pages');
        page_data.find( function (err, thePages) {
            if (err) {
                console.log("There was an error getting the list of pages");
                console.log(err);
                return res.render(err);
            }
            res.render('pages_list', { thePages: thePages }); // TODO - Write get_page
        });
        
    });
    router.get('/dashboard/page/new', function (req, res) {
        res.render('page_builder');
    });
    router.post('/dashboard/page/new/create', function (req, res) {
        var create_page = require('../models/pages');
        console.log(req);
        var page_fields = {
            pageName: req.body.pageName,
            pageHeading: req.body.pageHeading,
            pageUri: req.body.pageUri,
            pageContent: req.body.pageBody,
            pageTags: req.body.pageTags
        }
        var save_page = new create_page(page_fields);
        save_page.save(function (err, page) {
            if (err) {
                console.log("There was an error creating the new page");
                console.log(err);
                return res.render(err);
            } 
            return res.redirect('/dashboard/page/edit/' + page.id); //.render('/dashboard/page/edit/' + page.id);
        });
    });
    router.get("/dashboard/page/edit/:pageID", function (req, res) {
        var page_data = require('../models/pages');
        var pageID = req.params.pageID;
        page_data.find({ '_id': pageID }, function (err, thePage) {
            if (err) { 
                console.log("There was an error finding the page");
                console.log(err);
                return res.render(err);
            }
            console.log(thePage)
            res.render('page_builder', { thePage: thePage, pageID: pageID }); // TODO - Write get_page
            });
        
    });
    router.post("/dashboard/page/edit/:pageID", function (req, res) {
        var page_data = require('../models/pages');
        var pageID = req.params.pageID;
        var page_fields = {
            pageName: req.body.pageName,
            pageHeading: req.body.pageHeading,
            pageUri: req.body.pageUri,
            pageContent: req.body.pageBody,
            pageTags: req.body.pageTags
        }
        page_data.update({ '_id': pageID }, {page_fields} , function (err, thePage) {
            if (err) {
                console.log("There was an error finding the page");
                console.log(err);
                return res.render(err);
            }
            console.log(thePage)
            res.render('page_builder', { thePage: page_fields, update:true ,pageID: pageID }); // TODO - Write get_page
        });
        
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
            res.render('dashboard', { title: CMS_Title, user: req.session.passport.user })
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