var get_cms_settings = function (callback) {
    var settings_data = require('./settings.js');
    settings_data.find(function (err, _settings) {
        if (err) {
            console.log("There was an error finding you settings");
            console.log(err);
            return res.render(err)
        } else {
            callback(_settings);
        }
            
    })
}

var get_pages = function (callback) {
    var page_data = require('./pages.js');
    page_data.find(function (err, thePages) {
        if (err) {
            console.log("There was an error getting the list of pages");
            console.log(err);
            return res.render(err);
        }
       callback( thePages); 
    });
}

var All_SITE = function (callback) {
    get_cms_settings(function (_settings) { 
        this.settings = _settings;
    });
   get_pages(function (pages) {
        this.pages = pages;
    });
    callback(this); // yes i know

}
 All_SITE(function (data) { module.exports = data; });