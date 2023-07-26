const mongoose = require('mongoose');

const trainsSchema = mongoose.Schema({
    trainName : {type : String},
    trainNumber : {type : Number},
    departureTime : {type : Object},
    seatsAvailable : {type : Object},
    price : {type : Object},
    delayedBy : {type : Number},
},{timestamps : true});

module.exports = mongoose.model('trains',trainsSchema);