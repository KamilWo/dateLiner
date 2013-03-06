/**
 * Created with JetBrains WebStorm.
 * User: Kamil
 * Date: 01.03.13
 * Time: 16:43
 * To change this template use File | Settings | File Templates.
 */
/*var re1 = /\d+/g;*/
/*var re1 = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$;*/

var text;

var dataLiner = function() {
    text = document.getElementById("mw-content-text").innerHTML;
    var regExp1 = /\u0020\d{4,4}[-|–]\d{4,4}\u0020/igm;
    var regExp2 = /\u0020[1-2][0-9][0-9][0-9]\u0020/igm;
    var regExp3 = /\u0020\d{4,4}\u0020/g;

    var match, output;



    var matchAll = [];
    while ((match = regExp3.exec(text)) != null) {
        //console.log(match);
        matchAll.push(match);

    }
    console.log(matchAll);

    var sString = '</span>';
    var bString = '<span style="color:red">';

    output = text;

    for(var i = matchAll.length-1; i>=0; i--){
        output = [output.slice(0,matchAll[i].index+5), sString, output.slice(matchAll[i].index+5)].join('');
        output = [output.slice(0,matchAll[i].index), bString, output.slice(matchAll[i].index)].join('');
     }
    document.getElementById("mw-content-text").innerHTML = output;
};


dataLiner();