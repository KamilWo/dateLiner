/**
 * Created with JetBrains WebStorm.
 * User: Kamil
 * Date: 01.03.13
 * Time: 16:43
 * To change this template use File | Settings | File Templates.
 */
var dataLiner = function() {
    var text = document.getElementById("mw-content-text").textContent;
    /*var re1 = /\d{1,4}/;*/
    var re1 = /\d+/g;
    /*var re1 = ^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$;*/
    var t = re1.exec(text);
    /*document.write(t);*/
    alert("done");
    return t;
};

dataLiner();