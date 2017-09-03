var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    //Find the favorites posted by the logged in user
    Favorites.find({postedBy:req.decoded._doc._id})
        .populate('postedBy')
        .populate('dishes')
        .exec(function(err, favorite) {
            if(err) throw err;
            res.json(favorite);
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
    //Find the favorites object
    Favorites.find({postedBy:req.decoded._doc._id}, function(err, favorites) {
        if(err) throw err;
        if(!favorites || favorites.length == 0) {
            //Create a new favorite
            Favorites.create({
                postedBy:req.decoded._doc._id, 
                dishes: [req.body._id]
            }, function(err,favorite) {
                if(err) throw err;
                res.json(favorite);
            });
        } else {
            //Add the dish to the list of favorites if it is not already there
            let dishIndex = favorites[0].dishes.findIndex(f => f == req.body._id);
            if(dishIndex===-1) {
                console.log('Adding the dish to the favorites...');
                favorites[0].dishes.push(req.body._id);
                favorites[0].save(function(err, resp) {
                    if(err) throw err;
                    res.json(resp);
                });
            } else {
                console.log('Dish is already part of user\'s favorites');
                res.json(favorites[0]);
            }
        }
    }); //end find favorites
     
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    //Remove the entire favorite object posted by the user
    Favorites.remove({postedBy:req.decoded._doc._id}, function(err, resp) {
        if(err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Favorites.find({postedBy:req.decoded._doc._id}, function(err, favorites) {
        if(err) throw err;
        //If the favorites not set return null
        if(!favorites || favorites.length == 0) {
            var err = new Error('The favorites have not been set for this user!');
            err.status = 403;
            return next(err);
        }
        console.log(favorites[0].dishes);
        let dishIndex = favorites[0].dishes.findIndex(f => f == req.params.dishId);
        //Check the comment was posted by the same user who is trying to delete it
        if( dishIndex === -1) {
            var err = new Error('The dish was not found in the user\'s favorites!');
            err.status = 403;
            return next(err);
        }
        //Remove the comment
        favorites[0].dishes.splice(dishIndex, 1); //remove dish
        //Save the updated favorite object
        favorites[0].save(function(err, resp) {
            if(err) throw err;
            res.json(resp);
        });
    });
});

module.exports = favoriteRouter;