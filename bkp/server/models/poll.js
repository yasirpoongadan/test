const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pollSchema = new Schema({
    pollqtn: String,
    pollans: [String],
    answers: [String]
});

module.exports = mongoose.model('poll', pollSchema , 'poll');