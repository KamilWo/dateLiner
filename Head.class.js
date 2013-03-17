function Head(generator){

    this.generator = generator;

    this.ctnr = document.createElement('div')

    this.styleCtnr();

    this.addDates();

    this.addHollowStrip();

    var head = this;
    var generator = this.generator;

    this.dragEnd = function(e){
        document.getElementsByTagName('body')[0].removeEventListener('mouseup',head.dragEnd);
        document.getElementsByTagName('body')[0].removeEventListener('mousemove',head.bodyMove);
        head.drag = null;
    };

    this.bodyMove = function(e){

        e.preventDefault();

        if(e.which == 1)
        {

            var CurX = (e.pageX-head.ctnr.offsetLeft);

            if(head.drag == generator.head.holowMinDate)
            {
                if(
                    (CurX-head.initDragXStrip)>0&&
                    (head.initDragW-((CurX-head.initDragX)))>80+2
                    ){
                    head.holowStrip.style.left = (CurX-head.initDragXStrip) + 'px';
                    head.holowStrip.style.width = (head.initDragW-((CurX-head.initDragX))) + 'px';
                }
                else
                {
                    if((head.initDragW-((CurX-head.initDragX)))>80+2)
                    {
                        head.holowStrip.style.width = head.holowStrip.offsetLeft+head.holowStrip.offsetWidth + 'px';
                        head.holowStrip.style.left = 0;
                    }
                    else
                    {
                        head.holowStrip.style.left = head.holowStrip.offsetLeft+(head.holowStrip.offsetWidth-82) + 'px';
                        head.holowStrip.style.width = 82 + 'px';
                    }
                }

            }
            else if(head.drag == generator.head.holowMaxDate)
            {
                if(
                    (head.initDragW+((CurX-head.initDragX)))+head.holowStrip.offsetLeft <= head.ctnr.offsetWidth
                        && (head.initDragW+((CurX-head.initDragX)))>80+2
                    ){
                    head.holowStrip.style.width = (head.initDragW+((CurX-head.initDragX))) + 'px';
                }
                else
                {
                    if((head.initDragW+((CurX-head.initDragX)))>80+2)
                    {
                    head.holowStrip.style.width = (head.ctnr.offsetWidth - head.holowStrip.offsetLeft) + 'px';
                    }
                    else
                    {
                    head.holowStrip.style.width = 82 + 'px';
                    }
                }

            }
            else if(head.drag == generator.head.holowStrip)
            {
                if(
                    (CurX-head.initDragXStrip)+head.holowStrip.offsetWidth <= head.ctnr.offsetWidth
                    &&  (CurX-head.initDragXStrip)>0
                    ){
                    head.holowStrip.style.left = (CurX-head.initDragXStrip) + 'px';
                }
                else
                {
                    if((CurX-head.initDragXStrip)+head.holowStrip.offsetWidth > head.ctnr.offsetWidth)
                        head.holowStrip.style.left = (head.ctnr.offsetWidth-head.holowStrip.offsetWidth) + 'px';
                    console.log(CurX-head.initDragXStrip);
                    if((CurX-head.initDragXStrip)<0)
                        head.holowStrip.style.left = 0 + 'px';
                }
            }

            generator.clipMinDate = generator.minD + (head.holowStrip.offsetLeft/(head.ctnr.offsetWidth-80))*(generator.maxD-generator.minD);
            generator.clipMaxDate = generator.clipMinDate+((head.holowStrip.offsetWidth-80)/(head.ctnr.offsetWidth-80))*(generator.maxD-generator.minD);

            generator.head.holowMinDate.innerHTML = Math.floor(generator.clipMinDate);
            generator.head.holowMaxDate.innerHTML = Math.ceil(generator.clipMaxDate);

        }

        generator.recalculatePoints();
    };

    this.ctnr.onmouseup = function(e){


        //generator.stripsBg.recalculateStrips(5000);

    }

    this.ctnr.onmousedown = function(e){

        e.preventDefault();

        head.initDragX = (e.pageX-head.ctnr.offsetLeft);
        head.initDragXStrip = (e.pageX-head.ctnr.offsetLeft-head.holowStrip.offsetLeft);
        head.initDragW = head.holowStrip.offsetWidth;

        if(e.target == generator.head.holowMinDate
            || e.target == generator.head.holowMaxDate
            || e.target == generator.head.holowStrip)
        {
            head.drag = e.target;
            document.getElementsByTagName('body')[0].addEventListener('mouseup',head.dragEnd,false);
            document.getElementsByTagName('body')[0].addEventListener('mousemove',head.bodyMove);
            //head.ctnr.addEventListener('mouseup',head.dragEnd);
            //head.ctnr.addEventListener('mousemove',head.bodyMove);
        }

    };



}

Head.prototype.styleCtnr = function (){

    this.ctnr.className = 'dateLinerHead';

    this.ctnr.style.position = 'fixed';

    this.ctnr.style.position = 'fixed';
    this.ctnr.style.width = '50%';
    this.ctnr.style.left = '50%';
    this.ctnr.style.height = "40px";
    this.ctnr.style.top = "0px";
    this.ctnr.style.backgroundColor = "#009900";
    this.ctnr.style.overflow = 'hidden';
}

Head.prototype.addDates = function (){
    this.minDate = document.createElement('div');
    this.maxDate = document.createElement('div');

    this.minDate.style.position = 'absolute';
    this.maxDate.style.position = 'absolute';

    this.minDate.style.top = '8px';
    this.maxDate.style.top = '8px';

    this.minDate.style.webkitUserSelect = 'none';
    this.maxDate.style.webkitUserSelect = 'none';

    this.maxDate.style.right = '0px';
    this.minDate.style.left = '0px';

    this.maxDate.style.width = '40px';
    this.minDate.style.width = '40px';

    this.minDate.innerHTML = this.generator.minD;
    this.maxDate.innerHTML = this.generator.maxD;

    this.ctnr.appendChild(this.minDate);
    this.ctnr.appendChild(this.maxDate);
}

Head.prototype.addHollowStrip = function (){

    this.holowStrip = document.createElement('div');

    this.holowStrip.style.position = 'absolute';
    this.holowStrip.style.top = '0px';
    this.holowStrip.style.left = '0px';
    this.holowStrip.style.height = '100%';
    this.holowStrip.style.width = 100+'%';
    this.holowStrip.style.backgroundColor = "#00ff00";

    //this.holowStrip.style.webkitTransitionProperty = 'left,width';
    //this.holowStrip.style.webkitTransitionDuration = '300ms';

    this.ctnr.appendChild(this.holowStrip);

    this.holowMinDate = document.createElement('div');
    this.holowMaxDate = document.createElement('div');

    this.holowMinDate.style.position = 'absolute';
    this.holowMaxDate.style.position = 'absolute';

    this.holowMinDate.style.webkitUserSelect = 'none';
    this.holowMaxDate.style.webkitUserSelect = 'none';

    this.holowMinDate.style.top = '0px';
    this.holowMaxDate.style.top = '0px';

    this.holowMaxDate.style.right = '0px';
    this.holowMinDate.style.left = '0px';

    this.holowMaxDate.style.height = '40px';
    this.holowMinDate.style.height = '40px';

    this.holowMaxDate.style.width = '40px';
    this.holowMinDate.style.width = '40px';

    this.holowMinDate.style.backgroundColor = "red";
    this.holowMaxDate.style.backgroundColor = "red";

    this.holowMinDate.innerHTML = this.generator.minD;
    this.holowMaxDate.innerHTML = this.generator.maxD;

    this.holowStrip.appendChild(this.holowMinDate);
    this.holowStrip.appendChild(this.holowMaxDate);

}
