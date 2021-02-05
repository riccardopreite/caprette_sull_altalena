// get canvas variable
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

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

    toDraw1 = undefined

// init varible obj for both environment
var rope1 = new Rope(ctx)
var swing1 = new Swing(ctx)
var centerMass1 = new CenterMass(ctx, showLower, showLower)
var body1 = new Body(ctx, bodyHeight)


/*
IMPORTANT: always put swing BEFORE body show.
Body coordinates (and rotations) are calculated based on the Swing
 */
rope1.show()
swing1.show()
centerMass1.show()
body1.show()

var frameCounter = 0
function draw(){
  if(toDraw1 != undefined){
  // if(toDraw1 != undefined && toDraw2 != undefined){

    const FRAME_OFFSET = 20
    // for(f in standing_frameList){
    if(frameCounter > toDraw1.length) return
    else{
      var currentFrame1 = toDraw1[frameCounter]
  
      ctx.clearRect(0,0,canvas.width,canvas.height)
  
      rope1.update(currentFrame1)
      centerMass1.update(currentFrame1)
      swing1.update(currentFrame1)
      body1.update(currentFrame1)
  
      rope1.show()
      centerMass1.show()
      swing1.show()
      body1.show()
  
      ctx.setTransform(1,0,0,1,0,0)
  
      frameCounter += FRAME_OFFSET;
      requestAnimationFrame(draw)
      }
  } 
}

