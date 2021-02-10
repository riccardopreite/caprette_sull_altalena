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
var rope1 = undefined
var swing1 =undefined
var centerMass1 = undefined
var body1 = undefined

var rope2 = undefined
var swing2 = undefined
var centerMass2 = undefined
var body2 = undefined

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
