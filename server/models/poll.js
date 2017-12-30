const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pollSchema = new Schema({
    pollqtn: String,
    // pollans: [{ name:String, count : Number}]
    pollans: 
    [{ 
        name:String, 
        voteips : [{ip: String }]
    }]
    // answers: [String]
});

module.exports = mongoose.model('poll', pollSchema , 'poll');