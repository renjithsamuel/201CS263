const mongoose = require('mongoose');

const lastUpdatedsSchema = mongoose.Schema({
    date : {type : Date},
},{timestamps : true});

module.exports = mongoose.model('lastUpdateds',lastUpdatedsSchema);