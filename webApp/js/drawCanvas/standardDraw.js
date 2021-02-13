/*************************
      CANVAS VARIABLE
*************************/

var canvas0 = document.getElementById('canvas0');
var canvas1 = document.getElementById('canvas1');
var ctx0 = canvas0.getContext('2d');
var ctx1 = canvas1.getContext('2d');

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
  var rope0 = undefined
  var swing0 = undefined
  var centerMass0 = undefined
  var body0 = undefined
  var rope1 = undefined
  var swing1 = undefined
  var centerMass1 = undefined
  var body1 = undefined


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
      return
    }
    else {
      var currentFrame = toDraw0[frameCounterFirst]
      if(!frameCounterFirst) controlSelectSystem(0,true)

      ctx0.clearRect(0,0,canvas0.width,canvas0.height)

      rope0.update(currentFrame)
      centerMass0.update(currentFrame)
      swing0.update(currentFrame)
      body0.update(currentFrame)

      rope0.show()
      centerMass0.show()
      swing0.show()
      body0.show()

      ctx0.setTransform(1,0,0,1,0,0)
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
      if(!frameCounterSecond) controlSelectSystem(1,true)

      ctx1.clearRect(0,0,canvas1.width,canvas1.height)

      rope1.update(currentFrame)
      centerMass1.update(currentFrame)
      swing1.update(currentFrame)
      body1.update(currentFrame)

      rope1.show()
      centerMass1.show()
      swing1.show()
      body1.show()

      ctx1.setTransform(1,0,0,1,0,0)
      frameCounterSecond += FRAME_OFFSET;
    }
  }
}
