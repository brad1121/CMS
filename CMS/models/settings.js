var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Settings = new Schema({
    landingPage: String,
});



module.exports = mongoose.model('Settings', Settings);
