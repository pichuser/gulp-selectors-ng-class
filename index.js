module.exports = function (file, classLibrary, idLibrary) {
    var myRegexp = /ng-class="(.*?)"/g;
    var match = myRegexp.exec(file);
    var allmatches = [];
    while (match != null) {
        console.log(match);
        var r = match[1].match(/'.*?'/g);
        for (var j in r){
            allmatches.push(r[j].replace(/'/g, ''));
        }
        match = myRegexp.exec(file);
    }
    var f = file;
    for(var i in allmatches){
        f = f.replace(new RegExp(allmatches[i], 'g'), function(attr){
            return classLibrary.get(attr);
        });
    }
    return f;    
};
