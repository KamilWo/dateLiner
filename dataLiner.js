/**
 * Created with JetBrains WebStorm.
 * User: Kamil
 * Date: 01.03.13
 * Time: 16:43
 * To change this template use File | Settings | File Templates.
 */
/*var re1 = /\d+/g;*/
/*var re1 = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$;*/

function dateLiner(){

    var generator = new Generator();
    var extractor = new Extractor();

    extractor.extract();
    extractor.writeOut();
    extractor.dateParserForView();
    generator.generate();
}

dateLiner();