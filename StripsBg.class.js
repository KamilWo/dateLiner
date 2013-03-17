function StripsBg(generator){

    this.generator = generator;

    this.setColors = false;

    this.ctnr = document.createElement('div')

    this.maxSpanScaleStep = 31;

    this.minStripW = 10;

    this.spans = [1/365,1/12,1,10,100,1000];

    this.styleCtnr();

    this.addStrips();
}

StripsBg.prototype.styleCtnr = function (){

    this.ctnr.className = 'stripBg';

    this.ctnr.style.webkitTransformOrigin = '0% 0%';

    this.ctnr.style.position = 'absolute';
    this.ctnr.style.zIndex = '5';

    this.ctnr.style.width = '100%';
    this.ctnr.style.height = '100%';

}

StripsBg.prototype.addStrips = function (){

    this.ctnr.innerHTML = "";



    this.stripN = Math.ceil(this.generator.W/this.minStripW);

    //this.stripN = 0;

    var i = 0;



    this.stripsA1 = [];
    this.stripsA2 = [];
    this.stripsB1 = [];
    this.stripsB2 = [];

    this.allStrips = [
        this.stripsA1,
        this.stripsA2,
        this.stripsB1,
        this.stripsB2
    ];

    for(var j = 0;j<this.stripN*4;j++){

        i = Math.floor(j/4);

        var k = j%4;

        var newS = document.createElement('div');

        this.allStrips[k].push(newS);

        newS.className = 'strip';

        var newLabel = document.createElement('div');
        newLabel.className = 'label';
        newS.appendChild(newLabel);
        newS.label = newLabel;

        var newLabel10 = document.createElement('div');
        newLabel10.className = 'label label10';
        newS.appendChild(newLabel10);
        newS.label10 = newLabel10;

        var s = 0.5;
        var h = 180;
        var l = 0.9;

        h+=(k>1)?60:-60;
        l+=(k%2)?0.05:-0.025;

        newS.style.backgroundColor = 'hsl('+h+','+(s*100)+'%,'+(l*100)+'%)';

        //newS.style.backgroundImage = 'url(http://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Einstein_1921_by_F_Schmutzer.jpg/220px-Einstein_1921_by_F_Schmutzer.jpg)';

        //newS.style.backgroundSize = "100% 100%";

        newS.style.width = this.minStripW*this.maxSpanScaleStep +'px';

        newS.style.left = i*this.minStripW*this.maxSpanScaleStep + 'px';

        this.ctnr.appendChild(newS);
    }

}



StripsBg.prototype.labelFormat = [
    function(label){return label},
    function(label){
        return [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ][Math.floor((label%1)*12)];
    },
    function(label){
        return label + "";
    },
    function(label){
        return "'"+Math.floor((label%100)/10) + "0";
    },
    function(label){
        return Math.ceil(label/100) + "w";
    },
    function(label){return label}
];


StripsBg.prototype.recalculateStrips = function (){

    var maxD = this.generator.clipMaxDate;
    var minD = this.generator.clipMinDate;

    var Dspan = maxD - minD;

    var minSpan = Dspan * (this.minStripW/this.generator.W);

    var baseSpan = undefined;

    var spanPercent = undefined;

    var spanId = undefined;

    this.spans.reduce(function(a,b,i,all){
        if (minSpan>a && minSpan<b)
        {
            baseSpan = b;
            spanPercent = (Math.log(minSpan)-Math.log(a))/(Math.log(b)-Math.log(a));
            spanId=i;
        }
        return b;
    },0);

    //console.log(spanPercent);

    var i = 0;

    var s, l, h , sScale=1;

    var offset = -1*(this.generator.clipMinDate%this.spans[spanId])*this.generator.scale*this.generator.dateScale;
    var minLabel = Math.floor(this.generator.clipMinDate/this.spans[spanId])*this.spans[spanId];

    var baseH = 120;
    var baseL = 0.8;
    var baseS = 0.5;


    var amp1L = 0.05;
    var amp10L = 0.05;

    var amp10H = 180;
    var amp1H = 180;

    var amp10S = 0;
    var amp1S = 0;

    var labelTop = 20;
    var label10Top = 0;

    var labelOpacity = 1;

    if(0<spanPercent  && spanPercent<0.1)
    {
        //console.log('a')
        //tu 1 zaczynaja wygladac jak 1 , nie widac jeszcze 10
        amp1L *= (spanPercent)/0.1;
        amp1H *= 1;
        amp10L *= 0;
        amp10S *= 0;
        amp10H *= 0;
        label10Top = -labelTop*((0.1-spanPercent)/0.1);
        labelTop = labelTop*((spanPercent)/0.1);
        sScale *= (0.1-spanPercent)/0.1;
    }
    else if(0.1<spanPercent  && spanPercent<0.2)
    {
        //console.log('b')
        // tu pojawiaja sie 10;
        amp1L *= 1;
        amp10L *= 0;
        amp10S *= ((spanPercent)/0.1);
        amp1H *= 0;
        amp10H *= 1;
        sScale *= ((spanPercent-0.1)/0.1);
    }
    else if(0.9<spanPercent)
    {
        //console.log('d')
        // tu znika 1;
        amp1L *= ((1-spanPercent)/0.1);
        amp10L *= 0;
        amp10S *= 1;
        amp10H *= 1;
        amp1H *= 0;
        labelOpacity = ((1-spanPercent)/0.1);

        //labelTop += labelTop*((spanPercent-0.9)/0.1);
    }
    else
    {
        //console.log('c')
        //tu jest normalnie widac i 1 i 10

        amp1L *= 1;
        amp10L *= 0;
        amp10S *= 1;
        amp10H *= 1;
        amp1H *= 0;

    }
    //console.log(((1-spanPercent)/0.15),1-((1-spanPercent)/0.15))
    //console.log(amp1L,amp10L,amp10H);


    var lastState2 = undefined;

    var stripsScale  = (this.generator.scale*this.generator.dateScale*this.spans[spanId])/(this.maxSpanScaleStep*this.minStripW);


    for(var i = 0;i<this.stripN;i++){



        var label = minLabel+i*baseSpan;

        //console.log(i,label);

        var state1 = Boolean(((Math.floor(label/this.spans[spanId]))%2));
        var state2 = Boolean(((Math.floor(label/this.spans[spanId+1]))%2));

        l = baseL + (amp1L*((state1)?1:-0.5)) + amp10L*(state2?1:-0.5);

        h = baseH + (state2-0.5)*amp10H + (state1-0.5)*amp1H ;

        s = baseS + (state2-0.5)*amp10S + (state1-0.5)*amp1S;

        if(state1!=state2)
            s *= sScale;

        var strip = this.allStrips[state1*1+state2*2][i];

        this.allStrips[(!state1)*1+state2*2][i].style.webkitTransform = 'rotateY(90deg)'
        this.allStrips[(state1)*1+(!state2)*2][i].style.webkitTransform = 'rotateY(90deg)'
        this.allStrips[(!state1)*1+(!state2)*2][i].style.webkitTransform = 'rotateY(90deg)'

        strip.style.webkitTransform = 'rotateY(0deg)';
       // strip.style.webkitFilter = 'hue-rotate('+360+'deg)';
        //if(this.setColors)
            //strip.style.backgroundColor = 'hsl('+h+','+(s*100)+'%,'+(l*100)+'%)';


        //strip.label.style.opacity = labelOpacity;

        //strip.label.style.top = labelTop + 'px';
        //strip.label10.style.top = label10Top + 'px';


        if(lastState2 !== state2){
            strip.label10.innerHTML = this.labelFormat[spanId+1](label);
        }
        else
        {
            strip.label10.innerHTML = "";
        }

        strip.label.innerHTML = this.labelFormat[spanId](label);

        strip.label.style.webkitTransform = 'scale3d('
            +1+','
            +stripsScale+','
            +1+')';

        strip.label10.style.webkitTransform = 'scale3d('
            +1/stripsScale+','
            +1+','
            +1+')';

        lastState2 = state2;
    }

    this.setColors = false;


    var transform = 'translate3d('
        +offset+'px,'
        +0+'px,'
        //+(-1*Math.floor(spanPercent)*10000)+'px,'
        +0+'px'
        +')'
        +' scale3d('
        +stripsScale+','
        +1+','
        +1+')';

    this.ctnr.style.webkitTransform = transform;

    this.ctnr.style.webkitFilter = 'hue-rotate('+(50*spanId)+'deg)';

    //this.ctnr.style.webkitFilter = 'saturate('+(1-2*Math.abs(spanPercent-0.5))+')';
}