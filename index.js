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
};
