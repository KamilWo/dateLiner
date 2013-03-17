function Generator(){

    this.privClipMaxDate = undefined;
    this.privClipMinDate = undefined;
    this.scale = 1;
    this.dateScale = 1;

    this.date2px = function (date){
        return (date-this.clipMinDate)*this.W/(this.clipMaxDate-this.clipMinDate);
    }

    this.posYpx = function (top){
        return top*this.H/this.docH;
    }

    this.recalculatePointsINIT = function(){

        this.stripsBg.recalculateStrips();

        for (var i = 0;i<this.datePoints.length;i++)
        {
            var dp = this.datePoints[i];

            dp.style.top = 0;//this.posYpx(dp.mySpan.pos.y) + "px";
            dp.style.left = 0;//this.date2px(dp.mySpan.date) + "px";

            dp.style.webkitTransform = "translate3D("
            +this.date2px(dp.mySpan.date)+'px,'
            +this.posYpx(dp.mySpan.pos.y)+'px,'
            +'0'
            +")";

        }

        for(var i = 0;i<this.hLines.length;i++){
            this.hLines[i].style.webkitTransform = "translate3D("
                +0+'px,'
                +this.posYpx(this.hLines[i].h.pos.y)+'px,'
                +'0'
                +")";
        }

    }

    this.__defineSetter__('clipMaxDate',function(newMax){
        this.privClipMaxDate = newMax;
        this.scale = (this.maxD-this.minD)/(this.privClipMaxDate-this.privClipMinDate);
        this.dateScale = this.W/(this.maxD-this.minD);
    });

    this.__defineGetter__('clipMaxDate',function(){
        return this.privClipMaxDate;
    });

    this.__defineSetter__('clipMinDate',function(newMin){
        this.privClipMinDate = newMin;
        this.scale = (this.maxD-this.minD)/(this.privClipMaxDate-this.privClipMinDate);
        this.dateScale = this.W/(this.maxD-this.minD);
    });

    this.__defineGetter__('clipMinDate',function(){
        return this.privClipMinDate;
    });

    var that = this;

    this.targetClip = {min:undefined,max:undefined};

    var frame = function(timestamp){

        var stop = false;

        if(that.lastFrame==null){
            that.lastFrame=timestamp;
        }
        else
        {
            if(Math.abs(that.targetClip.min - that.clipMinDate) > 1/365 || Math.abs(that.targetClip.max - that.clipMaxDate) > 1/365)
            {
                that.clipMinDate += ((that.targetClip.min - that.clipMinDate)/(30*30))*(timestamp-that.lastFrame);
                that.clipMaxDate += ((that.targetClip.max - that.clipMaxDate)/(30*30))*(timestamp-that.lastFrame);
                that.recalculatePoints();
                that.lastFrame=timestamp;
            }
            else
            {
                that.clipMinDate = that.targetClip.min;
                that.clipMaxDate = that.targetClip.max;
                that.recalculatePoints();
                console.log('anim end');
                stop = true;
                that.lastFrame=null;
            }
            //console.log(that.lastFrame,timestamp,timestamp-that.lastFrame);

            that.lastFrame=timestamp;

        }

        if(!stop)
            window.webkitRequestAnimationFrame(frame);
    };


    this.goTo = function(min,max){
        that.lastFrame=null;
        this.targetClip = {min:min,max:max};
        frame();
    };


    this.recalculatePoints = function(){

        this.stripsBg.recalculateStrips();

        this.pointsCtnr.style.webkitTransform =
            "translateX("+String(this.date2px(this.minD))+"px)"
            +" scaleX("+this.scale+")";


    }


    this.generate = function (){

        this.initBuild();

        var spans = document.getElementsByClassName('dateliner');

        var maxD = 0;
        var minD = Infinity;

        this.spansOK = [];

        for (var i = 0;i<spans.length;i++)
        {
            var pos = getElementAbsolutePos(spans[i]);
            var date = parseInt(spans[i].innerText);
            if(date < 2020 && pos.y>0){

                this.spansOK.push(spans[i]);



                spans[i].pos = pos;
                spans[i].date = date;

                if(spans[i].date>maxD)
                    maxD = spans[i].date;

                if(spans[i].date<minD)
                    minD = spans[i].date;
            }
        }



        this.maxD = maxD;
        this.minD = minD;

        this.clipMaxDate = this.maxD;
        this.clipMinDate = this.minD;

        console.log(this.clipMinDate,this.clipMaxDate)

        this.datePoints = [];

        this.pointsCtnr = document.createElement('div');

        this.pointsCtnr.className = "pointsCtnr";

        this.pointsCtnr.style.webkitTransformOrigin = '0% 50%';

        this.pointsCtnr.style.zIndex = '50';
        this.pointsCtnr.style.width = '100%';
        this.pointsCtnr.style.height = '100%';
        this.pointsCtnr.style.position = 'absolute';

        this.dateLinerBody.appendChild(this.pointsCtnr);

        for (var i = 0;i<this.spansOK.length;i++)
        {

            var span = this.spansOK[i];

            var newDiv = document.createElement('div');

            newDiv.mySpan = this.spansOK[i];

            this.datePoints.push(newDiv);

            newDiv.style.position = "absolute";

            newDiv.style.width = this.dateScale + "px";
            newDiv.style.height = 3 + "px";

            newDiv.style.backgroundColor = 'black';

            newDiv.style.zIndex = '50';

            //newDiv.style.borderRadius = 5+'px';

            newDiv.onmousedown = function(e){
                window.scrollTo(0,e.target.mySpan.pos.y-e.target.offsetTop);
            }

            this.pointsCtnr.appendChild(newDiv);
        }



        window.onscroll = function(){
            generator.updateScroll();
        }

        this.addHeadlines()



        this.head = new Head(this);
        this.dateLinerBody.parentNode.appendChild(this.head.ctnr);

        this.stripsBg = new StripsBg(this);
        this.dateLinerBody.appendChild(this.stripsBg.ctnr);

        this.recalculatePointsINIT(0);

    };




    this.addHeadlines = function(){
        var headlinesDOM = document.getElementsByClassName('mw-headline');
        var h2DOM = [];
        var h3DOM = [];

        this.hLines = [];

        for(var i = 0;i<headlinesDOM.length;i++){
            headlinesDOM[i].pos = getElementAbsolutePos(headlinesDOM[i]);
            headlinesDOM[i].txt = headlinesDOM[i].innerText;
            if(headlinesDOM[i].parentNode.tagName == "H2"){
                h2DOM.push(headlinesDOM[i]);
            }
            if(headlinesDOM[i].parentNode.tagName == "H3"){
                h3DOM.push(headlinesDOM[i]);
            }
        }

        for(var i = 0;i<h2DOM.length;i++){
            var newH = document.createElement('div');
            this.dateLinerBody.appendChild(newH);
            //newH.innerText = h2DOM[i].innerText;
            newH.style.top = 0+'px';
            newH.style.borderTop = "2px solid #dddddd";
            newH.style.position = "absolute";
            newH.style.fontSize = "100%";
            newH.style.minHeight = "2px";
            newH.style.width = "100%";
            newH.style.zIndex = "35";
            newH.h = h2DOM[i];
            this.hLines.push(newH);
        }

        for(var i = 0;i<h3DOM.length;i++){
            var newH = document.createElement('div');
            this.dateLinerBody.appendChild(newH);
            //newH.innerText = h3DOM[i].innerText;
            newH.style.top = 0+'px';
            newH.style.borderTop = "1px solid #999999";
            newH.style.position = "absolute";
            newH.style.fontSize = "30%";
            newH.style.minHeight = "2px";
            newH.style.width = "100%";
            newH.style.zIndex = "35";
            newH.h = h3DOM[i];
            this.hLines.push(newH);
        }

    }

    this.updateScroll = function(){
        //console.log((this.H*(window.scrollY/(this.docH-this.H))));
        this.pageCursor.style.top = (this.H*(window.scrollY/(this.docH-this.H)))+'px';
    }

    this.initBuild = function(){

        var body = document.getElementsByTagName('body')[0];

        body.style.width = '50%';
        body.style.height = 'auto';
        body.style.position = 'relative';

        this.dateLinerBody = document.createElement('div');

        this.dateLinerBody = document.createElement('div');

        body.appendChild(this.dateLinerBody);

        this.dateLinerBody.style.width = '50%';
        this.dateLinerBody.style.left = '50%';

        this.dateLinerBody.style.top = '0';
        this.dateLinerBody.style.position = 'fixed';

        this.dateLinerBody.style.webkitTransform = "translate3D("
            +0+'px,'
            +0+'px,'
            +0+'px'
            +")";

        this.dateLinerBody.style.zIndex = '10';

        this.dateLinerBody.style.overflow = 'hidden';

        this.dateLinerBody.style.backgroundColor = 'none';

        this.dateLinerBody.style.top = '40px';

        this.W = this.dateLinerBody.offsetWidth-40;
        this.H = window.innerHeight-40;

        this.dateLinerBody.style.height = this.H+"px";

        this.docH = document.getElementsByTagName('body')[0].offsetHeight;


        this.pageCursor = document.createElement('div');

        this.pageCursor.style.zIndex = '20';

        this.pageCursor.style.backgroundColor = '#eeeeee';

        this.pageCursor.style.width = '100%';

        this.pageCursor.style.opacity = '0';

        this.pageCursor.style.position = 'absolute';

        this.pageCursor.style.height = (this.H*(this.H/this.docH))+'px';
        this.pageCursor.style.top = 0+'px';


        this.dateLinerBody.appendChild(this.pageCursor);
    }
}


function __parseBorderWidth(width) {
    var res = 0;
    if (typeof(width) == "string" && width != null && width != "" ) {
        var p = width.indexOf("px");
        if (p >= 0) {
            res = parseInt(width.substring(0, p));
        }
        else {
            //do not know how to calculate other values (such as 0.5em or 0.1cm) correctly now
            //so just set the width to 1 pixel
            res = 1;
        }
    }
    return res;
}


//returns border width for some element
function __getBorderWidth(element) {
    var res = new Object();
    res.left = 0; res.top = 0; res.right = 0; res.bottom = 0;

    res.left = __parseBorderWidth(element.style.borderLeftWidth);
    res.top = __parseBorderWidth(element.style.borderTopWidth);
    res.right = __parseBorderWidth(element.style.borderRightWidth);
    res.bottom = __parseBorderWidth(element.style.borderBottomWidth);

    return res;
}

function getElementAbsolutePos(element) {

    var res = new Object();
    res.x = 0; res.y = 0;
    if (element !== null) {
        res.x = element.offsetLeft;

        var offsetParent = element.offsetParent;
        var offsetParentTagName = offsetParent != null ? offsetParent.tagName.toLowerCase() : "";

        res.y = element.offsetTop;


        var parentNode = element.parentNode;
        var borderWidth = null;

        while (offsetParent != null) {
            res.x += offsetParent.offsetLeft;
            res.y += offsetParent.offsetTop;

            var parentTagName = offsetParent.tagName.toLowerCase();


            if (offsetParent != document.body && offsetParent != document.documentElement) {
                res.x -= offsetParent.scrollLeft;
                res.y -= offsetParent.scrollTop;
            }


            parentNode = offsetParent.parentNode;
            offsetParent = offsetParent.offsetParent;
        }
    }
    return res;
}

