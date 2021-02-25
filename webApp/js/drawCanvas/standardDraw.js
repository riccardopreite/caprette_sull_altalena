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
    speedGraphCanvas0 = document.getElementById("graphSpeed0"),
    timeGraphCanvas1 = document.getElementById("graphTime1");
    var speedGraphCanvas1 = document.getElementById("graphSpeed1");

var ctxTime0 = timeGraphCanvas0.getContext('2d'),
    ctxSpeed0 = speedGraphCanvas0.getContext('2d'),
    ctxTime1 = timeGraphCanvas1.getContext('2d');
    var ctxSpeed1 = speedGraphCanvas1.getContext('2d');

/*************************
        DRAWING VARIABLE
*************************/

  /*************************
    LIST FOR DRAWING SWING
  *************************/
  var toDraw0 = undefined,
  toDraw1 = undefined;

  var isDrawSecond = undefined,
      isDrawFirst = undefined;

  /*************************
  FRAME VARIABLE
  *************************/
  var frameCounterFirst = 0, frameCounterSecond = 0;
  const FRAME_OFFSET = 7;

  /*************************
  DRAWING COMPONENTS OBJECTS
  *************************/
  var drawComp0 = [rope0, swing0, centerMass0, body0]
  var drawComp1 = [rope1, swing1, centerMass1, body1]
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

function standardDraw(){
  if(firstInterval != undefined) clearInterval(firstInterval)
  if(secondInterval != undefined) clearInterval(secondInterval)
  frameCounterFirst = 0;
  frameCounterSecond = 0;
  firstInterval = setInterval(drawFirst, firstIntervalTimer);
  secondInterval = setInterval(drawSecond, secondIntervalTimer);
}

function drawFirst(){
  if(!isDrawFirst) return;
  if(toDraw0 != undefined && toDraw1 != undefined){
    if(frameCounterFirst > toDraw0.length){
      // To restart draw
      $("#selectDiv0 :input").prop( "disabled", false);
      // frameCounterFirst = 0;
      isDrawFirst = false
      $("#playButtonIcon0").text("refresh")

    }
    else {
      var currentFrame = toDraw0[frameCounterFirst]
      if(frameCounterFirst == 0) {
        //MANIPULATING DOM
        $("#selectDiv0 :input").prop( "disabled", true);
        $("#speedDownParent0").removeClass("disabled");
        $("#speedUpParent0").removeClass("disabled");
        $("#playButton0").removeClass("disabled");
        drawFirstBody()
        timeGraph0.resetChart()
        speedGraph0.resetChart()
        timeGraph0 = new Graph(ctxTime0,"Time/Angle graph","phi(rad)","time(s)","radiant angle")
        speedGraph0 = new Graph(ctxSpeed0,"Angular Speed/Angle graph","angular speed(rad/s)","phi(rad)","angular speed")
      }

      ctx0.clearRect(0,0,canvas0.width,canvas0.height)
      drawComp0.forEach(obj => {
        obj.update(currentFrame)
        obj.show()
      })
      ctx0.setTransform(1,0,0,1,0,0)
      timeGraph0.addScatterPoint(currentFrame.t.toFixed(3), currentFrame.phi.toFixed(3))
      // speed try
      speedGraph0.addScatterPoint(currentFrame.phi.toFixed(3), currentFrame.w.toFixed(3))
      frameCounterFirst += FRAME_OFFSET;
    }
  }
}

function drawSecond(){
  if(!isDrawSecond) return;
  if(toDraw0 != undefined && toDraw1 != undefined){
    if(frameCounterSecond > toDraw1.length) {
        // To restart draw
        $("#selectDiv1 :input").prop( "disabled", false);
        // frameCounterSecond = 0;
        isDrawSecond = false
        $("#playButtonIcon1").text("refresh")
        return
    }
    else {
      var currentFrame = toDraw1[frameCounterSecond]
      if(frameCounterSecond == 0) {
        //MANIPULATING DOM
        $("#selectDiv1 :input").prop( "disabled", true);
        $("#speedDownParent1").removeClass("disabled");
        $("#speedUpParent1").removeClass("disabled");
        $("#playButton1").removeClass("disabled");
        drawSecondBody()
        timeGraph1.resetChart()
        speedGraph1.resetChart()
        timeGraph1 = new Graph(ctxTime1,"Time/Angle graph","phi(rad)","time(s)","radiant angle")
        speedGraph1 = new Graph(ctxSpeed1,"Angular Speed/Angle graph","angular speed(rad/s)","phi(rad)","angular speed")
      }

      ctx1.clearRect(0,0,canvas1.width,canvas1.height)

      drawComp1.forEach(obj => {
        obj.update(currentFrame)
        obj.show()
      })
      ctx1.setTransform(1,0,0,1,0,0)
      timeGraph1.addScatterPoint(currentFrame.t.toFixed(3), currentFrame.phi.toFixed(3))
      // speed try
      // speedGraph1.addScatterPoint(currentFrame.w.toFixed(3), currentFrame.phi.toFixed(3))
      speedGraph1.addScatterPoint(currentFrame.phi.toFixed(3), currentFrame.w.toFixed(3))
      frameCounterSecond += FRAME_OFFSET;
    }
  }
}
