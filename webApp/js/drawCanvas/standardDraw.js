/*************************
      CANVAS VARIABLE
*************************/

var canvas0 = document.getElementById('canvas0');
var canvas1 = document.getElementById('canvas1');
var ctx0 = canvas0.getContext('2d');
var ctx1 = canvas1.getContext('2d');

/*************************
      GRAPH VARIABLE
*************************/
var timeGraphCanvas0 = document.getElementById("graphTime0"),
    // speedGraphCanvas0 = document.getElementById("graphSpeed0"),
    timeGraphCanvas1 = document.getElementById("graphTime1");
    // var speedGraphCanvas1 = document.getElementById("graphSpeed1");

var ctxTime0 = timeGraphCanvas0.getContext('2d'),
    // ctxSpeed0 = speedGraphCanvas0.getContext('2d'),
    ctxTime1 = timeGraphCanvas1.getContext('2d');
    // var ctxSpeed1 = speedGraphCanvas1.getContext('2d');

/*************************
        DRAWING VARIABLE
*************************/

  /*************************
    LIST FOR DRAWING SWING
  *************************/
  var toDraw0 = undefined,
  toDraw1 = undefined;

  /*************************
  FRAME VARIABLE
  *************************/
  var frameCounterFirst = 0, frameCounterSecond = 0;
  const FRAME_OFFSET = 20;

  /*************************
  DRAWING COMPONENTS OBJECTS
  *************************/
    /*************************
    SWING DRAWING COMPONENTS OBJECTS
    *************************/
    var rope0 = undefined
    var swing0 = undefined

    var rope1 = undefined
    var swing1 = undefined

    /*************************
    BODY DRAWING COMPONENTS OBJECTS
    *************************/
    var centerMass0 = undefined
    var body0 = undefined

    var centerMass1 = undefined
    var body1 = undefined

    /*************************
    GRAPH DRAWING COMPONENTS OBJECTS
    *************************/
    var timeGraph0 = undefined,
        speedGraph0 = undefined,
        timeGraph1 = undefined,
        speedGraph1 = undefined;

function draw(){
  if(firstInterval != undefined) clearInterval(firstInterval)
  if(secondInterval != undefined) clearInterval(secondInterval)
  frameCounterFirst = 0;
  frameCounterSecond = 0;
  firstInterval = setInterval(drawFirst, firstIntervalTimer);
  secondInterval = setInterval(drawSecond, secondIntervalTimer);
}

function drawFirst(){
  if(document.getElementById("playButton0").innerHTML.includes("play")) return;
  if(toDraw0 != undefined && toDraw1 != undefined){
    if(frameCounterFirst > toDraw0.length){
      // To restart draw
      disableEnableInput(0,false)
      frameCounterFirst = 0;
      document.getElementById("playButton0").innerHTML = "play_arrow";

    }
    else {
      var currentFrame = toDraw0[frameCounterFirst]
      if(frameCounterFirst == 0) {
        controlSelectSystem(0,true)
        timeGraph0.resetChart()
        timeGraph0 = new Graph(ctxTime0,"First Time/Angle graph")
      }

      ctx0.clearRect(0,0,canvas0.width,canvas0.height)
      updateSwing(rope0,swing0,currentFrame)
      updateBody(centerMass0,body0,currentFrame)

      showFrame(rope0,swing0,centerMass0,body0)

      ctx0.setTransform(1,0,0,1,0,0)
      timeGraph0.addPoint(currentFrame.t.toFixed(3), currentFrame.phi.toFixed(3))
      // speed try
      // timeGraph0.addPoint(currentFrame.w.toFixed(3), currentFrame.phi.toFixed(3))
      frameCounterFirst += FRAME_OFFSET;
    }
  }
}

function drawSecond(){
  if(document.getElementById("playButton1").innerHTML.includes("play")) return;
  if(toDraw0 != undefined && toDraw1 != undefined){
    if(frameCounterSecond > toDraw1.length) {
        // To restart draw
        disableEnableInput(1,false)
        frameCounterSecond = 0;
        document.getElementById("playButton1").innerHTML = "play_arrow";
        return
    }
    else {
      var currentFrame = toDraw1[frameCounterSecond]
      if(frameCounterSecond == 0) {
        controlSelectSystem(1,true)
        timeGraph1.resetChart()
        timeGraph1 = new Graph(ctxTime1,"Second Time/Angle graph")
      }

      ctx1.clearRect(0,0,canvas1.width,canvas1.height)

      updateSwing(rope1,swing1,currentFrame)
      updateBody(centerMass1,body1,currentFrame)

      showFrame(rope1,swing1,centerMass1,body1)

      ctx1.setTransform(1,0,0,1,0,0)
      console.log(currentFrame.t.toFixed(3));
      timeGraph1.addPoint(currentFrame.t.toFixed(3), currentFrame.phi.toFixed(3))
      // speed try
      // timeGraph1.addPoint(currentFrame.w.toFixed(3), currentFrame.phi.toFixed(3))
      frameCounterSecond += FRAME_OFFSET;
    }
  }
}
