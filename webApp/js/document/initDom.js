$( document ).ready(function() {
  console.log( "ready!" );
  prepareDom()
});

function prepareDom(){
  initCanvas();
  initBodyHeight();
  initDomSystem();
  //FIRST DRAW
  drawDom();


  /*************************
  THIS CODE COMMENTED IS NOT WORKING FOR SECOND CANVAS
  *************************/
  // var canvasContainer = document.getElementsByClassName('card-image');
  // var cs0 = getComputedStyle(canvasContainer[0]);
  // var cs1 = getComputedStyle(canvasContainer[1]);
  //
  // /// these will return dimensions in *pixel* regardless of what
  // /// you originally specified for image:
  // var width = parseInt(cs0.getPropertyValue('width'), 10);
  // var height = parseInt(cs0.getPropertyValue('height'), 10);
  //
  // canvas0.width = width;
  // canvas0.height = height;
  // width = parseInt(cs1.getPropertyValue('width'), 10);
  // height = parseInt(cs1.getPropertyValue('height'), 10);
  // canvas1.width = width;
  // canvas1.height = height;
}



/*******************************************************
                    START INIT FUNCTION
*******************************************************/
function initCanvas(){
  initCanvasList(0);
  initCanvasList(1);
  initFirstFrameList(0,ctx0)
  initFirstFrameList(1,ctx1)
  initCanvasMeasure()
}

function initDomSystem(){
  initOnChangeEvent()
  controlSelectSystem(0,false)
  controlSelectSystem(0,false)
  controlButtonSystem(1,true)
  controlButtonSystem(1,true)
  M.AutoInit();
}

function drawDom(){
  drawBodies()
  initGraph()
}

function initCanvasList(id){

  /*************************
    INIT CANVAS LIST
  *************************/

  canvasList[id] = {};
  canvasList[id]["standing_frameList"]= [];
  canvasList[id]["seated_frameList"]= [];
  canvasList[id]["realistic_frameList"]= [];
  canvasList[id]["combined_frameList"]= [];
}

function initFirstFrameList(id,ctx){

  /*************************
    INIT CANVAS LIST
  *************************/
  var SCALE_FACTOR = 100 / ($('#height'+id).val() / (bodyHeightDef*100))
  initFrame[id] = new Frame()
  new Frame(
      ctx,
      0, //time
      $('#phi'+id).is(":checked"),
      $('#w'+id).is(":checked"),
      "seated",
      [],
      [],
      [],
      []
  )
}

function initBodyHeight(){

  /*************************
    INIT BODY HEIGHT NEEDED FOR DRAWING COMPONENTS OBJECT
  *************************/

  bodyHeight0 = 160
  bodyHeight1 = 160
}

function initCanvasMeasure(){

  /*************************
    INIT CANVAS MEASURE
  *************************/

  ctx0.canvas.height = $("#parentCanvas0").height()
  ctx0.canvas.width = $("#parentCanvas0").width()
  ctx1.canvas.height = $("#parentCanvas1").height()
  ctx1.canvas.width = $("#parentCanvas1").width()
}

function initOnChangeEvent(){
  $("#selectDiv0 :input").change(updateSwingTypeFirst)
  $("#selectDiv1 :input").change(updateSwingTypeSecond)
}

function drawBodies(){
  /*
  IMPORTANT: always put swing BEFORE body show.
  Body coordinates (and rotations) are calculated based on the Swing
  */
  initFirstBody()
  initSecondBody()
}

function initGraph(){
  initGraphMeasure()
  timeGraph0 = new Graph(ctxTime0,"First Time/Angle graph","phi(rad)","time(s)","radiant angle")
  //speedGraph0 = new Graph(ctxTime0,"First Angular Speed/Angle graph","angular speed(rad/s)","time(s)","angular speed")
  timeGraph1 = new Graph(ctxTime1,"Second Time/Angle graph","phi(rad)","time(s)","radiant angle")
  // speedGraph1 = new Graph(ctxTime1,"Second Angular Speed/Angle graph","angular speed(rad/s)","time(s)","angular speed")
}

function initFirstBody(){
  rope0 = new Rope(ctx0)
  swing0 = new Swing(ctx0)
  centerMass0 = new CenterMass(ctx0, $('#upperCM0').is(":checked"), $('#lowerCM0').is(":checked"))
  body0 = new Body(ctx0, bodyHeight0)
  showFrame(rope0,swing0,centerMass0,body0)
}
function initSecondBody(){
  rope1 = new Rope(ctx1)
  swing1 = new Swing(ctx1)
  centerMass1 = new CenterMass(ctx1, $('#upperCM1').is(":checked"), $('#lowerCM1').is(":checked"))
  body1 = new Body(ctx1, bodyHeight1)
  showFrame(rope1,swing1,centerMass1,body1)
}

function initGraphMeasure(){
  timeGraphCanvas0.height = $("#graphTimeDiv0").height()
  timeGraphCanvas0.width = $("#graphTimeDiv0").width()

  // speedGraphCanvas0.height = $("#graphTimeDiv1").height()
  // speedGraphCanvas0.width = $("#graphTimeDiv1").width()
  timeGraphCanvas1.height = $("#graphTimeDiv1").height()
  timeGraphCanvas1.width = $("#graphTimeDiv1").width()

  // speedGraphCanvas1.height = $("#speedTimeDiv1").height()
  // speedGraphCanvas1.width = $("#speedTimeDiv1").height()
}
/*******************************************************
                    END INIT FUNCTION
*******************************************************/
