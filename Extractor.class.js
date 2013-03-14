function Extractor(){

    this.text = document.getElementById("mw-content-text").innerHTML;

    //good javascript tester: http://regexpal.com/  without / at beginning or flags /igm at the end
    //var regExpDecades = /[\s|\(]1[0-9][0-9]0s/igm;       //   1990s
    var regExpDates = /((((F|f)rom(\s|&nbsp;)late)|((F|f)rom))(\s|&nbsp;)(1[0-9]{3}|200[0-9]|201[1-3])(\s|&nbsp;)((to((\s|&nbsp;)early))|(to))(\s|&nbsp;)(1[0-9]{3}|200[0-9]|201[1-3]))|(((F|f)rom)(\s|&nbsp;)((3[0-1]|([1-2][0-9])|[1-9])(\s|&nbsp;))?(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)((\s|&nbsp;)(1[0-9]{3}|200[0-9]|201[1-3]))?(\s|&nbsp;)to(\s|&nbsp;)((3[0-1]|([1-2][0-9])|[1-9])(\s|&nbsp;))?(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)((\s|&nbsp;)(1[0-9]{3}|200[0-9]|201[1-3]))?)|((B|b)etween(\s|&nbsp;)((3[0-1]|([1-2][0-9])|[1-9])(\s|&nbsp;))?(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)((\s|&nbsp;)(1[0-9]{3}|200[0-9]|201[1-3]))?(\s|&nbsp;)and(\s|&nbsp;)((3[0-1]|([1-2][0-9])|[1-9])(\s|&nbsp;))?(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)((\s|&nbsp;)(1[0-9]{3}|200[0-9]|201[1-3]))?)|((\s|\()?(mid\-)?1[0-9][0-9]0s(\s|\()?)|([\s|\(]?(1[0-9]{3}|200[0-9]|201[1-3])[(\s\-\s)|( \- )|\-|–|-](1[0-9]{3}|200[0-9]|201[1-3]|[0-9][0-9])(\s|&nbsp;|,|\.|\))?)|((\s|\()?(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)(\s|&nbsp;)(3[0-1]|([1-2][0-9])|[1-9])(,&nbsp;|,\s|\s|\()(1[0-9]{3}|200[0-9]|201[1-3])(\s|\)?))|((\s|\()?((3[0-1]|([1-2][0-9])|[1-9])\/)?(3[0-1]|([1-2][0-9])|[1-9])(\s|&nbsp;)(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)(,&nbsp;|,\s|\s|\()(1[0-9]{3}|200[0-9]|201[1-3])(\s|\)?))|((\s|\()?(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)(&nbsp;|,\s|,&nbsp;|\s|\()(1[0-9]{3}|200[0-9]|201[1-3])(\s|\)?))|((3[0-1]|([1-2][0-9])|[1-9])(\s|&nbsp;)(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)|((((B|b)y)|((B|b)y(\s|&nbsp;)early(\s|&nbsp;)))?(1[0-9]{3}|200[0-9]|201[1-3])))/igm;
    var output = this.text;


    this.extract = function() {
        var match, matchAll = [];
        while ((match = regExpDates.exec(output)) != null) {
            matchAll.push(match);
        }

        var sString = '</span>';
        var bString = '<span class="dateliner" style="color: red">';

        for(var i = matchAll.length-1; i>=0; i--){

            var j = matchAll[i].index;
            while (true){
            if (output[j] === "<"){
            output = [output.slice(0,matchAll[i].index+matchAll[i][0].length), sString, output.slice(matchAll[i].index+matchAll[i][0].length)].join('');
            output = [output.slice(0,matchAll[i].index), bString, output.slice(matchAll[i].index)].join('');
                break;
            } else if (output[j] === ">") {
                break;
            }
            j++;
        }
        }
        alert(matchAll.length + " dates");
        //this.text = output;
    };

    this.dateParserForView = function(){
        var dates = document.getElementsByClassName("dateliner");
        var date = "";
        for(var spanId = 0; spanId < dates.length; spanId++){
            //tylko rok
            var regExpYear = /(1[0-9]{3})|200[0-9]|201[1-3]/igm;
            if((date = regExpYear.exec(dates[spanId].innerHTML)) != null)
            dates[spanId].meta = {Y: date[0]};
            console.log(dates[spanId].meta, dates[spanId].innerHTML, spanId);
        }
    };

    this.writeOut = function(){
        document.getElementById("mw-content-text").innerHTML = output;
    };
}