var dbb = require('mongoose');

dbb.connect('mongodb://mongomongo:mongo1@ds053438.mongolab.com:53438/cms_dev')

module.exports = dbb.connection;