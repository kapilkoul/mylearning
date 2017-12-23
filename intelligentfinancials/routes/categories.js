var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Categories = require('../models/category');
var Verify = require('./verify');

var categoryRouter = express.Router();

categoryRouter.use(bodyParser.json());

categoryRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Categories.find({createdBy: req.decoded._id})
        .populate('createdBy')
        .exec(function(err, category) {
            if(err) return next(err);
            res.json(category);
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
    //Set the createdBy to the user id from the request object first
    req.body.createdBy = req.decoded._id;
    //Create the accoutn
    Categories.create(req.body, function(err,category) {
        if(err) return next(err);
        
        console.log('Category '+category.label + ' created');
        var id = category._id;
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end('Added the category with id: ' + id);
    });   
})
//Careful this deletes all the categories this user created
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Categories.remove({createdBy: req.decoded._id}, function(err, resp) {
        if(err) return next(err);
        res.json(resp);
    });
});

categoryRouter.route('/:categoryLabel')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Categories.find({label:req.params.categoryLabel, createdBy: req.decoded._id})
        .populate('createdBy')
        .exec(function(err, category) {
            if(err) return next(err);
            res.json(category);
        });
})

.put(Verify.verifyOrdinaryUser, function(req, res, next){
    Categories.findOneAndUpdate({label:req.params.categoryLabel, createdBy: req.decoded._id}, {
        $set: req.body
    }, {
        new: true
    }, function(err, category) {
        if(err) return next(err);
        
        res.json(category);
    });
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Categories.findOneAndRemove({label:req.params.categoryLabel, createdBy: req.decoded._id}, function(err, resp) {
        if(err) return next(err);
        
        res.json(resp);
    });
});

module.exports = categoryRouter;