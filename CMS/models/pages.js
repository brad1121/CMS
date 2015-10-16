var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Page = new Schema({
    pageName: String,
    pageHeading: String,
    pageUri: String,
    pageContent: String,
    pageTags: String,
});



module.exports = mongoose.model('Page', Page);
