var expressions = require('../utils/expressions');
/**
 * Replaces all class and id attributes found in the library. Only tested on *.html files with
 * classes declared in *class= attributes.
 *
 * @param {string} File
 * @returns {string} Minified file
 */
var cheerio = require('cheerio');

module.exports = function (file, classLibrary, idLibrary) {
    var $ = cheerio.load(file);
    var c = $('[ng-class]');
        var allmatches = [];
        c.each(function(i, el){
            var t = $(el).attr('ng-class');
            var r = t.match(/".*?"/g);
            for (var j in r){
                allmatches.push(r[j].replace(/"/g, ''));
            }
        })
    var f = file;
    for(var i in allmatches){
        f = f.replace(new RegExp(allmatches[i], 'g'), function(attr){
            return classLibrary.get(attr);
        });
    }
    return f;
    /* return file.replace(expressions.elementAttribute, function(attributes) {
        var attribute = attributes.split('=');
        return attribute[0] + '=' + attribute[1]
                .replace(expressions.selectorName, function(selectorName) {
                    switch (attribute[0]) {
                        case 'id':
                        case 'for':
                            return idLibrary.get(selectorName);
                        default: //class
                            return classLibrary.get(selectorName);
                    }
                });
    });
    */
};
