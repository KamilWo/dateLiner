function Extractor(){

    this.text = document.getElementById("mw-content-text").innerHTML;

    this.extract = function() {

        var regExp1 = /\u0020\d{4,4}[-|–]\d{4,4}\u0020/igm;
        var regExp2 = /\u0020[1-2][0-9][0-9][0-9]\u0020/igm;
        var regExp3 = /[\u0020|\(]\d{4,4}[\u0020|,|.|\)]/igm;

        var match, output;

        var matchAll = [];
        while ((match = regExp3.exec(this.text)) != null) {
            //console.log(match);
            matchAll.push(match);

        }
        //console.log(matchAll);

        var sString = '</span>';
        var bString = '<span class="dateliner" style="color:red">';

        output = this.text;

        for(var i = matchAll.length-1; i>=0; i--){
            output = [output.slice(0,matchAll[i].index+5), sString, output.slice(matchAll[i].index+5)].join('');
            output = [output.slice(0,matchAll[i].index+1), bString, output.slice(matchAll[i].index+1)].join('');
        }
        //alert(matchAll.length);
        document.getElementById("mw-content-text").innerHTML = output;

        var spans = document.getElementsByClassName('dateliner');

        for (spanId in spans){
            if(spans[spanId].parentNode)
                spans[spanId].parentNode.style.color = 'green';
        }

    };

}

