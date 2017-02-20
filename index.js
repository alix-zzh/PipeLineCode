/**
 * Created by alex on 12.2.17.
 */
function PipelineObj(rez, num,index,bitnum) {
    this.rez = rez;
    this.num = num;
    this.index=index;
    this.bitnum=bitnum;
}
var p;
var maxElInPipeline;
var ElInPipeline=0;
var ArrayOfPipelineElement= new Array();
var ArrayRezOfWork= new Array();


function startPipeline() {
    for(var index=0; index<ArrayOfPipelineElement.length-1; index++)
        setTimeout(ArrayOfPipelineElement[index].SumAndMove(index), 0);


}
function addToPipeline(firstNum,secondNum) {
    ArrayOfPipelineElement[0].stack.push(new PipelineObj(0,firstNum,0,secondNum));
}
function createPipeline() {
    var el={
        SumAndMove: function (index) {
            if(ArrayOfPipelineElement[index].stack.length==0){
                ArrayOfPipelineElement[index].work=false;
                return;
            }

            if(ElInPipeline>=maxElInPipeline){
                console.log("too march el at pipeline "+ElInPipeline);
                setTimeout(ArrayOfPipelineElement[index+1].SumAndMove(index+1), 1);
                // setTimeout(ArrayOfPipelineElement[index].SumAndMove(index), 1);
                return;
            }

            ArrayOfPipelineElement[index].timeNow++;
            if(ArrayOfPipelineElement[index].timeNow<ArrayOfPipelineElement[index].time){
                ArrayOfPipelineElement[index].SumAndMove(index);
                return;
            }


            ArrayOfPipelineElement[index].timeNow=0;
            var workObj=ArrayOfPipelineElement[index].stack.shift();
            // console.log(workObj.bitnum+".."+workObj.num);
            ElInPipeline++;

            var DoSum=(workObj.bitnum).toString(2).charAt(workObj.index);

            if(DoSum==1){
                workObj.rez+=workObj.num;
            }
            if(workObj.index<(workObj.bitnum).toString(2).length-1)
                workObj.rez<<=1;
            ArrayOfPipelineElement[index+1].stack.push(new PipelineObj(workObj.rez,workObj.num,++workObj.index,workObj.bitnum));
            // ArrayRezOfWork[index].push(workObj.bitnum);

            setTimeout(ArrayOfPipelineElement[index].SumAndMove(index), 1);
        },
        stack:new Array(),
        work:true,
        timeNow:0,
        time:7
    }
    ArrayOfPipelineElement.push(el);
    for(var i=1;i<p-1;i++){
        el={
            SumAndMove: function (index) {
                if(!ArrayOfPipelineElement[index-1].work && ArrayOfPipelineElement[index].stack.length==0){
                    setTimeout(ArrayOfPipelineElement[index+1].SumAndMove(index+1), 1);
                    ArrayOfPipelineElement[index].work=false;
                    return;
                }
                // console.log("index "+index+" run");
                // console.log(ArrayOfPipelineElement[index].stack.length);
                if(ArrayOfPipelineElement[index-1].work && ArrayOfPipelineElement[index].stack.length==0){
                    setTimeout(ArrayOfPipelineElement[index+1].SumAndMove(index+1), 1);
                    return;
                }
                ArrayOfPipelineElement[index].timeNow++;
                if(ArrayOfPipelineElement[index].timeNow<ArrayOfPipelineElement[index].time){
                    ArrayOfPipelineElement[index].SumAndMove(index);
                    return;
                }

                ArrayOfPipelineElement[index].timeNow=0;
                var workObj=ArrayOfPipelineElement[index].stack.shift();
                // console.log(workObj.bitnum+".."+workObj.num+".."+index);
                var DoSum=(workObj.bitnum).toString(2).charAt(workObj.index);
                if(DoSum==1){
                    workObj.rez+=workObj.num;
                }
                if(workObj.index<(workObj.bitnum).toString(2).length-1)
                    workObj.rez<<=1;
                // ArrayRezOfWork[index].push(workObj.bitnum);
                ArrayOfPipelineElement[index+1].stack.push(new PipelineObj(workObj.rez,workObj.num,++workObj.index,workObj.bitnum));

                setTimeout(ArrayOfPipelineElement[index].SumAndMove(index), 1);

            },
            stack:new Array(),
            work:true,
            timeNow:0,
            time:2
        }
        ArrayOfPipelineElement.push(el);
    }
    el={
        SumAndMove: function (index) {
            if(ArrayOfPipelineElement[index].stack.length==0){
                ArrayOfPipelineElement[index].work=false;
                return;
            }

            if(ArrayOfPipelineElement[index-1].work&& ArrayOfPipelineElement[index].stack.length==0){
                setTimeout(ArrayOfPipelineElement[index].SumAndMove, 1);

                return;
            }
            // console.log(ArrayOfPipelineElement[index].stack[0].bitnum);

            ArrayOfPipelineElement[index].timeNow++;
            if(ArrayOfPipelineElement[index].timeNow<ArrayOfPipelineElement[index].time){
                ArrayOfPipelineElement[index].SumAndMove(index);
                return;
            }

            ArrayOfPipelineElement[index].timeNow=0;
            var workObj=ArrayOfPipelineElement[index].stack.shift();

            // console.log(workObj.bitnum+".."+workObj.num+".."+index);
            var DoSum=(workObj.bitnum).toString(2).charAt(workObj.index);
            if(DoSum==1){
                workObj.rez+=workObj.num;
            }
            if(workObj.index<(workObj.bitnum).toString(2).length-1)
                workObj.rez<<=1;

            ElInPipeline--;
            console.log(workObj.rez);
            // ArrayRezOfWork[index].push(workObj.bitnum);

            if(ElInPipeline+1>=maxElInPipeline&&ArrayOfPipelineElement[0].stack.length!=0){
                // console.log("too march el in pipeline "+ElInPipeline);
                setTimeout(ArrayOfPipelineElement[0].SumAndMove(0), 1);
                // setTimeout(ArrayOfPipelineElement[index].SumAndMove(index), 1);

            }

            setTimeout(ArrayOfPipelineElement[index].SumAndMove(index), 1);

        },
        stack:new Array(),
        work:true,
        timeNow:0,
        time:7
    }
    ArrayOfPipelineElement.push(el);
}

    // createPipeline();
    // addToPipeline(1,2);
    // addToPipeline(1,3);
    // addToPipeline(1,4);
    // addToPipeline(1,5);
    // addToPipeline(1,6);
    // addToPipeline(1,7);
    // addToPipeline(1,8);
    // addToPipeline(1,9);
    // addToPipeline(1,10);
    // addToPipeline(1,11);
    // addToPipeline(1,12);
    // addToPipeline(1,13);
    // addToPipeline(1,14);
    // addToPipeline(1,15);
    // addToPipeline(1,16);
    // addToPipeline(1,17);
    // addToPipeline(1,18);
    // addToPipeline(1,19);





    // startPipeline();






