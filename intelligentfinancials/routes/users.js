var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    User.find({}, function(err, user) {
        if(err) return next(err);
        res.json(user);
    });
});

router.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            return res.status(500).json({status: 'Couldnot register new user', success: false, message: err.message});
        }
        if(req.body.firstname) user.firstname = req.body.firstname;
        if(req.body.lastname) user.lastname = req.body.lastname;
        user.save(function(err, users) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!', success: true, user: users});
            });
        });
    });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.status(401).json({
                status: 'Couldnot log in user', success: false, message: info.message
            });
        }
        req.logIn(user, function(err) {
            if(err) {
                return res.status(500).json({status: 'Couldnot log in user', success: false, message: err.message});
            }
            
            console.log('User in users: ', user);
            
            //Use a subset of user object to retrieve token
            var token = Verify.getToken({"username":user.username,"_id":user._id,"admin": user.admin});
            
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token,
                user: user
            });
        });
    }) (req, res, next); //end passport authenticate
}); //end post handling

router.get('/logout', Verify.verifyOrdinaryUser, function(req, res) {
    req.logout();
    res.status(200).json({status: 'Bye!'});
});

router.get('/facebook', passport.authenticate('facebook'), function(req, res) {});
router.get('/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
        if(err) return next(err);
        if(!user) {
            return res.status(401).json({err:info});
        }
        req.logIn(user, function(err) {
            if(err) return res.status(500).json({status: 'Couldnot log in user', success: false, message: err.message});
            //Get token based on a subset of user information
            var token = Verify.getToken({"username":user.username,"_id":user._id,"admin": user.admin});
            res.status(200).json({
                status: 'Login successful',
                success: true,
                token: token,
                user: user
            });
        });
    }) (req, res, next); //end passport authenticate
});

module.exports = router;
