const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Poll = require('../models/poll');

const db = 'mongodb://localhost/polls';

mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.log('Error' + err);
    }
});

router.get('/polls',function(req,res){
    console.log("api get requet for all polls");
    Poll.find({}).exec(function(err,polls){
        if(err){
            console.log("Error " + err);
        }else{
            res.json(polls);
        }
    });
});

router.get('/polls/:id',function(req,res){
    console.log("api get requet for a single polls");
    Poll.findById(req.params.id).exec(function(err,poll){
        if(err){
            console.log("Error " + err);
        }else{
            res.json(poll);
        }
    });
});

router.post('/polls',function(req,res){
    console.log("new poll submit");
    var newPoll = new Poll();
    newPoll.pollqtn = req.body.pollqtn;
    newPoll.pollans = req.body.pollans;
    newPoll.save(function(err,insertedPoll){
        if(err){
            console.log("Error " + err);
        }else{
            res.json(insertedPoll);
        }
    })

});

router.put('/polls/:id',function(req,res){
    console.log("poll updated");
    Poll.findByIdAndUpdate(req.params.id,
    {
        $set:{answers: req.body.answers}
    },
    {
        new : true
    }, function (err, updatedPoll) {
        if(err){
            console.log("Error " + err);
        }else{
            res.json(updatedPoll);
        }
    }

    );

});

module.exports = router;