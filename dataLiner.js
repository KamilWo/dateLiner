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
    var regExp3 = /\u0020\d{4,4}\u0020/igm;

    var match, output;

    while ((match = text.match(regExp3)) != null) {

        for(var i = match.length; i >0; i--){
            output = [text.slice(0, match[i].index+4), "\</span>", text.slice(match[i].index+4)].join('');
            output = [text.slice(0, match[i].index), "\<span style=\"color: red;\">", text.slice(match[i].index)].join('');
        }
    }
    document.getElementById("mw-content-text").innerHTML = output;
};


dataLiner();