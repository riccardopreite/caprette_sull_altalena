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

// init frame list for both environment
var standing_frameList = [],
    seated_frameList = [],
    realistic_frameList = [],
    combined_frameList = [],

    toDraw1 = undefined,
    toDraw2 = undefined;

// init varible obj for both environment //======================== perche' passi il canvas?? basta il cxt => ctx.canvas.clientHeight
var rope1 = new Rope(ctx1,canvas1)
var swing1 = new Swing(ctx1,canvas1)
var centerMass1 = new CenterMass(ctx1, showLower, showLower)
var body1 = new Body(ctx1, bodyHeight,canvas1)

var rope2 = new Rope(ctx2,canvas2)
var swing2 = new Swing(ctx2,canvas2)
var centerMass2 = new CenterMass(ctx2, showLower, showLower)
var body2 = new Body(ctx2, bodyHeight,canvas2)


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

var frameCounter = 0
const FRAME_OFFSET = 20
function draw(){
  // if(toDraw1 != undefined){
  if(toDraw1 != undefined && toDraw2 != undefined){
    if(frameCounter > toDraw1.length) return
    else {
      var currentFrame1 = toDraw1[frameCounter]
      var currentFrame2 = toDraw2[frameCounter]

      // clear
      ctx1.clearRect(0,0,canvas1.width,canvas1.height)
      ctx2.clearRect(0,0,canvas2.width,canvas2.height)

      // update
      rope1.update(currentFrame1)
      centerMass1.update(currentFrame1)
      swing1.update(currentFrame1)
      body1.update(currentFrame1)

      rope2.update(currentFrame2)
      centerMass2.update(currentFrame2)
      swing2.update(currentFrame2)
      body2.update(currentFrame2)

      // show
      rope1.show()
      centerMass1.show()
      swing1.show()
      body1.show()  

      rope2.show()
      centerMass2.show()
      swing2.show()
      body2.show()

      // reset 
      ctx1.setTransform(1,0,0,1,0,0)
      ctx2.setTransform(1,0,0,1,0,0)

      frameCounter += FRAME_OFFSET;
      requestAnimationFrame(draw)
    }
  }
}
