var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Accounts = require('../models/account');
var Transactions = require('../models/transaction');
var Verify = require('./verify');

var transactionRouter = express.Router();

transactionRouter.use(bodyParser.json());


transactionRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    year = req.query.year;
    month = req.query.month;
    if(!parseInt(year)) year = "";
    if(!parseInt(month)) month = "";
    
    query = getQuery(req.decoded._id, "", "", false, year, month);
    
    Transactions.find(query)
        .populate('createdBy accountTo accountFrom')
        .exec(function(err, transaction) {
            if(err) return next(err);
            res.json(transaction);
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
    //Set the createdBy to the user id from the request object first
    req.body.createdBy = req.decoded._id;
    //Replace account identifiers with their mongo ids
    Accounts.find({identifier:{$in: [req.body.accountTo, req.body.accountFrom]}, createdBy: req.decoded._id}, function(err, account) {
        if(err) next(err);
        if(account.length<2)
            next({message: "One of the accounts not found", error: {}});
        accountTo = (account[0].identifier == req.body.accountTo)?0:1;
        req.body.accountTo = account[accountTo]._id;
        req.body.accountFrom = account[accountTo==0?1:0]._id;
        //Create the transaction
        Transactions.create(req.body, function(err,transaction) {
            if(err) return next(err);

            console.log('Transaction '+transaction._id + ' created');
            Transactions.findById(transaction._id)
                .populate('createdBy accountTo accountFrom')
                .exec(function(err, transaction) {
                    if(err) return next(err);
                    res.status(200).json({
                        status: 'Transaction creation successful!',
                        success: true,
                        transaction: transaction
                    });
                });
        }); 
    });
    
      
})
//Careful this deletes all the accounts this user created
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Transactions.remove({createdBy: req.decoded._id}, function(err, resp) {
        if(err) return next(err);
        res.json(resp);
    });
});

validYear = function(year) {
    let val = parseInt(year);
    if(!val) return 1900;
    return val;
}

validMonth = function(month) {
    let val = parseInt(month);
    if(!val) return 1;  
    return val;
}

getQuery = function(createdBy, accountTo, accountFrom="", either=false, year="", month="") {
        //Construct the appropriate query JSON string to send to mongo db
        query = "";
        //If both to and from transactions are required
        if(either && accountTo!="" &&accountFrom!="") {
            query += "{\"accountTo\":\""+accountTo+"\"}, ";
            query += "{\"accountFrom\":\""+accountFrom +"\"} ";
            query = "\"$or\": ["+query+"], ";
        } 
        //else take both separately (equivalent to and)
        else {
            if(accountTo!="") 
                query += "\"accountTo\":\""+accountTo+"\", ";
            if(accountFrom!="")
                query += "\"accountFrom\":\""+accountFrom +"\", ";
        }

        if(year!="") {
            start = end = null;
            if(month=="") {
                start = new Date(''+validYear(year)+'-1-1'); //start of the year, Jan is 0
                end = new Date(''+(validYear(year)+1)+'-1-1'); //start of next year
            } else if(month!="") {
                start = new Date(''+validYear(year)+'-'+validMonth(month)+'-1'); //start of current month
                if(month == '12') end = new Date(''+(validYear(year)+1)+'-1-1'); //start of next year
                else end = new Date(''+validYear(year)+'-'+(validMonth(month)+1)+'-1'); //start of next month
            }
            query += "\"date\":{\"$gte\": \""+start.toISOString()+
                "\", \"$lt\": \""+ end.toISOString()+"\"}, ";
        }
        query = "{"+query+"\"createdBy\":\""+createdBy+"\"}"; //add the userid to query
        console.log(query);
        return JSON.parse(query); //set the query on the request object for next handler
};

transactionRouter.route('/toAccount/:accountTo')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    year = req.query.year;
    month = req.query.month;
    if(parseInt(year)==undefined) year = "";
    if(parseInt(month)==undefined) month = "";
    
    //Lookup the accounts first
    Accounts.find({identifier:req.params.accountTo,  createdBy: req.decoded._id}, function(err, account) {
        //If there was an error or no accounts found return error
        if(err) return next({message:err.message, error:err});
        if(account.length ==0) return next({message:"No such account found", error:{}});
        accountTo = account[0]._id;
        
        query = getQuery(req.decoded._id, accountTo, "", false, year, month);
        
        //Get all the transactions
        Transactions.find(query)
        .populate('createdBy accountTo accountFrom')
        .exec(function(err, transaction) {
            if(err) return next(err);
            console.log("Transactions retreived: "+transaction.length);
            res.json(transaction);
        });
    });
});

transactionRouter.route('/fromAccount/:accountFrom')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    year = req.query.year;
    month = req.query.month;
    if(parseInt(year)==undefined) year = "";
    if(parseInt(month)==undefined) month = "";
    
    //Lookup the accounts first
    Accounts.find({identifier:req.params.accountFrom,  createdBy: req.decoded._id}, function(err, account) {
        //If there was an error or no accounts found return error
        if(err) return next({message:err.message, error:err});
        if(account.length ==0) return next({message:"No such account found", error:{}});
        accountFrom = account[0]._id;
        
        query = getQuery(req.decoded._id, "", accountFrom, false, year, month);
        
        //Get all the transactions
        Transactions.find(query)
        .populate('createdBy accountTo accountFrom')
        .exec(function(err, transaction) {
            if(err) return next(err);
            console.log("Transactions retreived: "+transaction.length);
            res.json(transaction);
        });
    });
});

transactionRouter.route('/toFromAccount/:accountTo/:accountFrom')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    year = req.query.year;
    month = req.query.month;
    if(parseInt(year)==undefined) year = "";
    if(parseInt(month)==undefined) month = "";
    
    //Lookup the accounts first
    Accounts.find({identifier: {$in: [req.params.accountTo,req.params.accountFrom]},  createdBy: req.decoded._id}, function(err, account) {
        //If there was an error or no accounts found return error
        if(err) return next({message:err.message, error:err});
        if(account.length <2) return next({message:"One or more accounts not found", error:{}});
        accountTo = account[0]._id; accountFrom = account[1]._id;
        //Reverse values if identifiers don't match
        if(account[0].identifier != req.params.accountFrom) {
            temp = accountTo; accountTo = accountFrom; accountFrom = temp;
        }
        
        query = getQuery(req.decoded._id, accountTo, accountFrom, false, year, month);
        
        //Get all the transactions
        Transactions.find(query)
        .populate('createdBy accountTo accountFrom')
        .exec(function(err, transaction) {
            if(err) return next(err);
            console.log("Transactions retreived: "+transaction.length);
            res.json(transaction);
        });
    });
});

transactionRouter.route('/toOrFromAccount/:account')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    year = req.query.year;
    month = req.query.month;
    if(parseInt(year)==undefined) year = "";
    if(parseInt(month)==undefined) month = "";
    //Lookup the accounts first
    Accounts.find({identifier:req.params.account,  createdBy: req.decoded._id}, function(err, account) {
        //If there was an error or no accounts found return error
        if(err) return next({message:err.message, error:err});
        if(account.length ==0) return next({message:"No such account found", error:{}});
        accountTo = account[0]._id;
        
        query = getQuery(req.decoded._id, accountTo, accountTo, true, year, month);
        
        //Get all the transactions
        Transactions.find(query)
        .populate('createdBy  accountTo accountFrom')
        .exec(function(err, transaction) {
            if(err) return next(err);
            console.log("Transactions retreived: "+transaction.length);
            res.json(transaction);
        });
    });
});

transactionRouter.route('/byDate/:year')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
        
        query = getQuery(req.decoded._id, "", "", false, req.params.year);
        
        //Get all the transactions
        Transactions.find(query)
        .populate('createdBy  accountTo accountFrom')
        .exec(function(err, transaction) {
            if(err) return next(err);
            console.log("Transactions retreived: "+transaction.length);
            res.json(transaction);
        }); 
});

transactionRouter.route('/byDate/:year/:month')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
        
        query = getQuery(req.decoded._id, "", "", false, req.params.year, req.params.month);
        
        //Get all the transactions
        Transactions.find(query)
        .populate('createdBy  accountTo accountFrom')
        .exec(function(err, transaction) {
            if(err) return next(err);
            console.log("Transactions retreived: "+transaction.length);
            res.json(transaction);
        }); 
});

transactionRouter.route('/toOrFromAccount/:account/balance')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    year = req.query.year;
    month = req.query.month;
    if(!parseInt(year)) year = "";
    if(!parseInt(month)) month = "";
    //Lookup the accounts first
    Accounts.find({identifier:req.params.account,  createdBy: req.decoded._id}, function(err, account) {
        //If there was an error or no accounts found return error
        if(err) return next({message:err.message, error:err});
        if(account.length ==0) return next({message:"No such account found", error:{}});
        accountTo = account[0]._id;
        
        query = getQuery(req.decoded._id, accountTo, accountTo, true, year, month);
        
        //Get all the transactions
        Transactions.find(query)
        .populate('createdBy  accountTo accountFrom')
        .exec(function(err, transaction) {
            if(err) return next(err);
            console.log("Transactions retreived: "+transaction.length);
            let balance = calculateBalance(accountTo, transaction);
            res.json({accountId: req.params.account, balance: balance});
        });
    });
});

transactionRouter.route('/balance')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    year = req.query.year;
    month = req.query.month;
    if(!parseInt(year)) year = "";
    if(!parseInt(month)) month = "";
    
    query = getQuery(req.decoded._id, "", "", false, year, month);
    var o = {};
    o.map = function () {emit(this.accountTo, this.amount)};
    o.reduce = function (key, values) {
                    var sum = 0.0;
                    var currentVal= 0.0; 
                    if(!values) return 0.0;
                    for(val of values) {
                        currentVal = 1.0*val;
                        sum = sum+currentVal;
                    }
                    return sum;
        };
    o.query = query;
    Transactions.mapReduce(o, function(err, toTotals) {
            if(err) return next(err);

            o.map = function () {emit(this.accountFrom, this.amount)};
            Transactions.mapReduce(o, function(err, fromTotals) {
                    if(err) return next(err);
                    if(!fromTotals || fromTotals.length===0) return res.json(toTotals);
                    //For each of the toTotals
                    for(let i=0; i< fromTotals.length; i++) {
                        let added = false; 
                        for(let j=0; j< toTotals.length; j++) {
                            //If the toId matches the current fromId then substract them
                            if(toTotals[j]._id.equals(fromTotals[i]._id)) {
                                toTotals[j].value = toTotals[j].value - fromTotals[i].value;
                                added = true; break;
                            }
                        }
                        if(!added) toTotals.push({_id:fromTotals[i]._id, value:-fromTotals[i].value});
                    }
                    res.json(toTotals);
                }); //end fromAccount total mapreduce
        }); //end toAccount total mapreduce
});


sumVals=function(values) {
    let sum = 0.0;
    let currentVal= 0.0; 
    if(!values) return 0.0;
    for(val of values) {
        currentVal = 1.0*val;
        sum = sum+currentVal;
    }
    return sum;
}

calculateBalance = function(accountId, transactions) {
    let balance = 0.0;
    let currentAmount = 0.0;
    for(transaction of transactions) {
        //console.log(transaction.amount.value);
        currentAmount = transaction.amount.value;
        
        //console.log("From: "+transaction.accountFrom._id+", To: "+transaction.accountTo._id+", Me: "+accountId);

        if (transaction.accountFrom._id.equals(accountId)) {
            balance = balance - 1.0*currentAmount; //Deduct from the balance if this is a fromAccount
        } else if (transaction.accountTo._id.equals(accountId)) {
            balance = balance + 1.0*currentAmount; //Add to the balance if this is a toAccount
        }
    }
    
    return balance;
}

module.exports = transactionRouter;