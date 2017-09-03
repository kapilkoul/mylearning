var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
var Verify = require('./verify');

var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Dishes.find({})
        .populate('comments.postedBy')
        .exec(function(err, dish) {
            if(err) throw err;
            res.json(dish);
        });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Dishes.create(req.body, function(err,dish) {
        if(err) throw err;
        
        console.log('Dish '+dish.name + ' created');
        var id = dish._id;
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end('Added the dish with id: ' + id);
    });   
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Dishes.remove({}, function(err, resp) {
        if(err) throw err;
        res.json(resp);
    });
});

dishRouter.route('/:dishId')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function(err, dish) {
            if(err) throw err;
            res.json(dish);
        });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function(err, dish) {
        if(err) throw err;
        
        res.json(dish);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Dishes.findByIdAndRemove(req.params.dishId, function(err, resp) {
        if(err) throw err;
        
        res.json(resp);
    });
});

dishRouter.route('/:dishId/comments')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function(err, dish) {
            if(err) throw err;
            res.json(dish.comments);
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
    Dishes.findById(req.params.dishId, function(err, dish) {
        if(err) throw err;
        req.body.postedBy = req.decoded._doc._id; //Add the user id
        dish.comments.push(req.body);
        
        dish.save(function(err, dish) {
            if(err) throw err;
            res.json(dish);
        });
    }); 
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Dishes.findById(req.params.dishId, function(err,dish) {
       if(err) throw err;
        
        var numComments = dish.comments.length;
        //Remove comments individual as blanking array is not supported
        for(var i= (dish.comments.length - 1); i>=0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        
        dish.save(function(err, result) {
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Deleted all '+numComments+ ' comments');
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function(err, dish) {
            if(err) throw err;
            res.json(dish.comments.id(req.params.commentId));
        }); 
})
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Dishes.findById(req.params.dishId, function(err, dish) {
        if(err) throw err;
        //First delete the current id
        dish.comments.id(req.params.commentId).remove();
        //Add the user id to the request body
        req.body.postedBy = req.decoded._doc._id;
        //Add the newly posted comment
        dish.comments.push(req.body);
        //save the updated dish object
        dish.save(function (err, dish) {
            if(err) throw err;
            console.log('Update comments');
            res.json(dish);
        });
    });
})
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Dishes.findById(req.params.dishId, function(err, dish) {
        if(err) throw err;
        //Check the comment was posted by the same user who is trying to delete it
        if(dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        //Remove the comment
        dish.comments.id(req.params.commentId).remove();
        //Save the updated dish object
        dish.save(function(err, resp) {
            if(err) throw err;
            res.json(resp);
        });
    });
});

module.exports = dishRouter;