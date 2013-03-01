/**
 * Created with JetBrains WebStorm.
 * User: Kamil
 * Date: 01.03.13
 * Time: 16:43
 * To change this template use File | Settings | File Templates.
 */

var text;

var dataLiner = function() {
    text = document.getElementById("mw-content-text").textContent;
    var re1 = /\d{4,4}/g;
    /*var re1 = /\d+/g;*/
    /*var re1 = ^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$;*/
    var t = text.match(re1);
    /*document.write(t);*/
    alert("done");
    return t;
};

dataLiner();