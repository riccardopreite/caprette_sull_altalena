// get canvas variable
var canvas1 = document.getElementById('firstCanvas');
var canvas2 = document.getElementById('secondCanvas');
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');

// get visualization option
// var showUpper = Document.getElementById("checkbox_shoeUpper").value()
var showUpper = false
var showLower = false

var bodyHeight = 160

var firstInterval = undefined,
    secondInterval = undefined
// init frame list for both environment
var canvasList = []
canvasList[0] = {};
canvasList[1] = {};
canvasList[0]["standing_frameList"]= [];
canvasList[0]["seated_frameList"]= [];
canvasList[0]["realistic_frameList"]= [];
canvasList[0]["combined_frameList"]= [];
canvasList[1]["standing_frameList"]= [];
canvasList[1]["seated_frameList"]= [];
canvasList[1]["realistic_frameList"]= [];
canvasList[1]["combined_frameList"]= [];

var toDraw1 = undefined,
    toDraw2 = undefined;
// init varible obj for both environment
var rope1 = new Rope(ctx1)
var swing1 = new Swing(ctx1)
var centerMass1 = new CenterMass(ctx1, showLower, showLower)
var body1 = new Body(ctx1, bodyHeight)

var rope2 = new Rope(ctx2)
var swing2 = new Swing(ctx2)
var centerMass2 = new CenterMass(ctx2, showLower, showLower)
var body2 = new Body(ctx2, bodyHeight)

/*
IMPORTANT: always put swing BEFORE body show.
Body coordinates (and rotations) are calculated based on the Swing
 */
rope1.show()
swing1.show()
centerMass1.show()
body1.show()

rope2.show()
swing2.show()
centerMass2.show()
body2.show()

var frameCounterFirst = 0, frameCounterSecond = 0, firstChange = false, secondChange = false;
const FRAME_OFFSET = 20
function draw(){
  if(firstInterval != undefined) clearInterval(firstInterval)
  if(secondInterval != undefined) clearInterval(secondInterval)
  frameCounterFirst = 0;
  frameCounterSecond = 0;
  firstInterval = setInterval(drawFirst, 10);
  secondInterval = setInterval(drawSecond, 10);
}

function drawFirst(){
  if(checkPause("firstPauseButton")) return;
  if(toDraw1 != undefined){
    if(frameCounterFirst > toDraw1.length){
      frameCounterFirst = 0;
      firstPausePressed()
      return
    }
    else {
      var currentFrame = toDraw1[frameCounterFirst]

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
      frameCounterFirst += FRAME_OFFSET;
    }
  }
}

function drawSecond(){
  if(checkPause("secondPauseButton")) return;
  if(toDraw2 != undefined){
    if(frameCounterSecond > toDraw2.length) {
      frameCounterSecond = 0;
     secondPausePressed()
     return
    }
    else {
      var currentFrame = toDraw2[frameCounterSecond]

      ctx2.clearRect(0,0,canvas2.width,canvas2.height)

      rope2.update(currentFrame)
      centerMass2.update(currentFrame)
      swing2.update(currentFrame)
      body2.update(currentFrame)

      rope2.show()
      centerMass2.show()
      swing2.show()
      body2.show()

      ctx2.setTransform(1,0,0,1,0,0)
      frameCounterSecond += FRAME_OFFSET;
    }
  }
}

/*function draw(){
  // if(toDraw1 != undefined){
  if(toDraw1 != undefined && toDraw2 != undefined){
    // add interval timer
    onOffPauseButton(false)
    onOffPlayButton(true)
    // for(f in standing_frameList){
    if(frameCounter > toDraw1.length) return
    else {
      var currentFrame = toDraw1[frameCounter]

      ctx.clearRect(0,0,canvas.width,canvas.height)

      rope1.update(currentFrame)
      centerMass1.update(currentFrame)
      swing1.update(currentFrame)
      body1.update(currentFrame)

      rope1.show()
      centerMass1.show()
      swing1.show()
      body1.show()

      ctx.setTransform(1,0,0,1,0,0)
      var currentFrame2 = toDraw2[frameCounter]

      secondCtx.clearRect(0,0,canvas.width,canvas.height)

      rope2.update(currentFrame2)
      centerMass2.update(currentFrame2)
      swing2.update(currentFrame2)
      body2.update(currentFrame2)

      rope2.show()
      centerMass2.show()
      swing2.show()
      body2.show()

      secondCtx.setTransform(1,0,0,1,0,0)

      frameCounter += FRAME_OFFSET;
      requestAnimationFrame(draw)
    }
  }
}*/
