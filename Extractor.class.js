function Extractor(){

    this.text = document.getElementById("mw-content-text").innerHTML;

    //var regexpTextInside = />*</igm;
    var regExp4 = /[\s|\(][1-2][0-9][0-9][0-9][\s|,|.|\)]/igm;
    var regExpDecades = /[\s|\(][1-2][0-9][0-9][0-9]s/igm;
    var regExpMonths = /[\s|\(](0[1-9]|[1-9]|[1-2][0-9]|3[01])[\s|][January|February|March|April|May|June|July|August|September|October|November|December][\s|][1-2][0-9][0-9][0-9]/igm;
    //var regExp3 = /[\u0020|\(]\d{4,4}[\u0020|,|.|\)]/igm;
    var regExp7 = /[\s|\(][1-2][0-9][0-9][0-9][-|–|–][0-9][0-9][\s|,|.|\)|s]/igm;
    var regExp9 = /[\s|\(][1-2][0-9][0-9][0-9][-|–|–][1-2][0-9][0-9][0-9][\s|,|.|\)|s]/igm;
    var output = this.text;


    this.extractMonths = function() {
        var match, matchAll = [];
        while ((match = regExpMonths.exec(output)) != null) {
            matchAll.push(match);
        }

        var sString = '</span>';
        var bString = '<span class="datelinerMonths" style="color: red">';

        for(var i = matchAll.length-1; i>=0; i--){
            //console.log("len" + matchAll[i][0].length);

            var j = matchAll[i].index;
            while (true){
            if (output[j] === "<"){
            output = [output.slice(0,matchAll[i].index+matchAll[i][0].length), sString, output.slice(matchAll[i].index+matchAll[i][0].length)].join('');
            output = [output.slice(0,matchAll[i].index+1), bString, output.slice(matchAll[i].index+1)].join('');
                break;
            } else if (output[j] === ">") {
                break;
            }
            j++;
        }
        }
        alert(matchAll.length);
        this.text = output;
    };

    this.extract = function() {
        var match, matchAll = [];
        while ((match = regExp4.exec(output)) != null) {
            matchAll.push(match);
        }

        var sString = '</span>';
        var bString = '<span class="dateliner" style="color: red">';

        for(var i = matchAll.length-1; i>=0; i--){
            var j = matchAll[i].index;
            while (true){
            if (output[j] === "<"){
            output = [output.slice(0,matchAll[i].index+5), sString, output.slice(matchAll[i].index+5)].join('');
            output = [output.slice(0,matchAll[i].index+1), bString, output.slice(matchAll[i].index+1)].join('');
                break;
            } else if (output[j] === ">") {
                break;
            }
            j++;
        }
        }
        alert(matchAll.length);
        this.text = output;
    };

    this.extractRanges7 = function() {
        var match, matchAll = [];
        while ((match = regExp7.exec(output)) != null) {
            matchAll.push(match);
        }
        //console.log(matchAll);

        var sString = '</span>';
        var bString = '<span class="datelinerRange7" style="color: #ff00b3">';

        for(var i = matchAll.length-1; i>=0; i--){
            var j = matchAll[i].index;
            while (true){
                if (output[j] === "<"){
                    output = [output.slice(0,matchAll[i].index+8), sString, output.slice(matchAll[i].index+8)].join('');
                    output = [output.slice(0,matchAll[i].index+1), bString, output.slice(matchAll[i].index+1)].join('');
                    break;
                } else if (output[j] === ">") {
                    break;
                }
                j++;
            }
        }
        alert(matchAll.length);
        this.text = output;
    };

    this.extractRanges9 = function() {
        var match, matchAll = [];
        while ((match = regExp9.exec(output)) != null) {
            matchAll.push(match);
        }

        var sString = '</span>';
        var bString = '<span class="datelinerRange9" style="color: #00ddff">';

        for(var i = matchAll.length-1; i>=0; i--){
            var j = matchAll[i].index;
            while (true){
                if (output[j] === "<"){
                    output = [output.slice(0,matchAll[i].index+10), sString, output.slice(matchAll[i].index+10)].join('');
                    output = [output.slice(0,matchAll[i].index+1), bString, output.slice(matchAll[i].index+1)].join('');
                    break;
                } else if (output[j] === ">") {
                    break;
                }
                j++;
            }
        }
        alert(matchAll.length);
        this.text = output;
    };

    this.extractDecades = function() {
        var match, matchAll = [];
        while ((match = regExpDecades.exec(output)) != null) {
            matchAll.push(match);
        }

        var sString = '</span>';
        var bString = '<span class="datelinerDecades" style="color: #00ddff">';

        for(var i = matchAll.length-1; i>=0; i--){
            var j = matchAll[i].index;
            while (true){
                if (output[j] === "<"){
                    output = [output.slice(0,matchAll[i].index+5), sString, output.slice(matchAll[i].index+5)].join('');
                    output = [output.slice(0,matchAll[i].index+1), bString, output.slice(matchAll[i].index+1)].join('');
                    break;
                } else if (output[j] === ">") {
                    break;
                }
                j++;
            }
        }
        alert(matchAll.length);
        this.text = output;
    };


    this.writeOut = function(){

        document.getElementById("mw-content-text").innerHTML = output;

        var spans = document.getElementsByClassName('dateliner');

        for (var spanId in spans){
            if (spans[spanId].parentNode)
                spans[spanId].parentNode.style.color = 'green';
        }

        var spansDecades = document.getElementsByClassName('datelinerDecades');

        for (var spanId in spansDecades){
            if (spansDecades[spanId].parentNode)
                spansDecades[spanId].parentNode.style.color = 'green';
        }

        var spans7 = document.getElementsByClassName('datelinerRange7');

        for (var spanId in spans7){
            if (spans7[spanId].parentNode)
                spans7[spanId].parentNode.style.color = 'green';
        }

        var spans9 = document.getElementsByClassName('datelinerRange9');

        for (var spanId in spans9){
            if (spans9[spanId].parentNode)
                spans9[spanId].parentNode.style.color = 'green';
        }

        var spansMonths = document.getElementsByClassName('datelinerMonths');

        for (var spanId in spansMonths){
            if (spansMonths[spanId].parentNode)
                spansMonths[spanId].parentNode.style.color = 'green';
        }
    };
}