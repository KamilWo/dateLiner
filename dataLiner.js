/**
 * Created with JetBrains WebStorm.
 * User: Kamil
 * Date: 01.03.13
 * Time: 16:43
 * To change this template use File | Settings | File Templates.
 */
/*var re1 = /\d+/g;*/
/*var re1 = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$;*/

var generator;
var extractor;

function dateLiner(){

    generator = new Generator();
    extractor = new Extractor();


    //var dateBefore = new Date();
    extractor.extract();
    extractor.writeOut();
    extractor.dateParserForView();
    generator.generate();
    //var dateAfter = new Date();
    //console.log(dateAfter-dateBefore);
}

dateLiner();