var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Accounts = require('../models/account');
var Verify = require('./verify');

var accountRouter = express.Router();

accountRouter.use(bodyParser.json());

accountRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Accounts.find({createdBy: req.decoded._id})
        .populate('createdBy')
        .exec(function(err, account) {
            if(err) return next(err);
            res.json(account);
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
    //Set the createdBy to the user id from the request object first
    req.body.createdBy = req.decoded._id;
    //Create the accoutn
    Accounts.create(req.body, function(err,account) {
        if(err) return next(err);
        
        console.log('Account '+account.identifier + ' created');
        var id = account._id;
        res.status(200).json({
            status: 'Account creation successful!',
            success: true,
            account: account
        });
    });   
})
//Careful this deletes all the accounts this user created
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Accounts.remove({createdBy: req.decoded._id}, function(err, resp) {
        if(err) return next(err);
        res.json(resp);
    });
});

accountRouter.route('/:accountId')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Accounts.find({identifier:req.params.accountId, createdBy: req.decoded._id})
        .populate('createdBy')
        .exec(function(err, account) {
            if(err) return next(err);
            res.json(account);
        });
})

.put(Verify.verifyOrdinaryUser, function(req, res, next){
    Accounts.findOneAndUpdate({identifier:req.params.accountId, createdBy: req.decoded._id}, {
        $set: req.body
    }, {
        new: true
    }, function(err, account) {
        if(err) return next(err);
        
        res.status(200).json({
            status: 'Account updation successful!',
            success: true,
            account: account
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Accounts.findOneAndRemove({identifier:req.params.accountId, createdBy: req.decoded._id}, function(err, resp) {
        if(err) return next(err);
        
        res.json(resp);
    });
});


module.exports = accountRouter;