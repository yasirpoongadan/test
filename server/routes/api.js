const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Poll = require('../models/poll');

//const db = 'mongodb://localhost/polls';

const db = 'mongodb://yasir:yasir@ds155695.mlab.com:55695/my_polls';

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
    Poll.findById(req.params.id).lean().exec(function(err,poll){
        if(err){
            console.log("Error " + err);
        }else{
            var userVoted = false,
            userChoice,
            totalVotes = 0;
            for(c in poll.pollans) {
                var choice = poll.pollans[c];
               // console.log(choice);
                for(v in choice.voteips) {
                  var vote = choice.voteips[v];
                  totalVotes++;
                  if(vote.ip === (req.header('x-forwarded-for') || req.ip)) {
                    userVoted = true;
                    userChoice = { _id: choice._id, name: choice.name };
                  }
                }
            }
            // poll.userVoted = false;
             poll.userVoted = userVoted;
            poll.userChoice = userChoice;
            poll.totalVotes = totalVotes;
          //  console.log(poll);
            res.json(poll);
        }
    });
});

router.post('/poll',function(req,res){
    console.log("new poll submit");
    var reqBody = req.body,
    pollans = reqBody.pollans.filter(function(v) { return v.name != ''; }),
    pollObj = {pollqtn: reqBody.pollqtn, pollans: pollans};
    var newPoll = new Poll(pollObj);
    newPoll.save(function(err,insertedPoll){
        if(err){
            console.log("Error " + err);
        }else{
            res.json(insertedPoll);
        }
    })

});

router.put('/poll/:id',function(req,res){
    console.log("poll updated");
    Poll.findOneAndUpdate({"_id" : req.params.id,"pollans.name" : req.body.answers},
    {
        $inc:{"pollans.$.count": 1}
    },
    { new : true },
    function (err, updatedPoll) {
        if(err){
            console.log("Error " + err);
        }else{
            res.json(updatedPoll);
        }
    }

    );

});

module.exports = router;