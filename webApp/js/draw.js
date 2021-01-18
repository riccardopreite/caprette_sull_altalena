//Canvas misure: width="800" height="600"
var ropeLength = 2.7, // 2.7 metri default = metà del canvas| MAX?
  bodyHeight = 1.0,   // 1.0 metri default
  bodyMass = 50,      // 50.0kg default
  gravity = 9.8;      // 9.8 m/s^2 default

var ctx;// canvas Var

// var xRectStart = 330, yRectStart = 240, widthRect = 150, heightRect = 100, degreesRect = 25;
var xRectStart = 380, yRectStart = 240, widthRect = 50, heightRect =100, degreesRect = 0;

var degrees = 0;
var x1Rope1Start = 390, x2Rope1Start = 380, y1Rope1Start = 260, y2Rope1Start = 280, y3Rope1Start = 0
var x1Rope2Start = 450, x2Rope2Start = 440, y1Rope2Start = 290, y2Rope2Start = 310, y3Rope2Start = 0

$( document ).ready(function() {
  console.log( "ready!" );
  var c = document.getElementById("myCanvas");
  ctx = c.getContext("2d");
  ctx.beginPath();


  drawRect(xRectStart,yRectStart,widthRect,heightRect,degreesRect)
  // drawSwingRect(360,270,10,-300)
  drawSwingRect(400,300,10,-300)
  // drawSwingLine(x1Rope1Start,x2Rope1Start,y1Rope1Start,y2Rope1Start,y3Rope1Start,degrees)
  // drawSwingLine(x1Rope2Start,x2Rope2Start,y1Rope2Start,y2Rope2Start,y3Rope2Start,degrees)


});
function drawAgain(){
  degrees+=1
  drawSwingRect(400,300+degrees,10,-300)
}

function drawSwingRect(x,y,width, height){
  // ctx.save();
  ctx.beginPath();
  if(degrees){
    console.log("PC");
    ctx.fillStyle = "blue";
    ctx.translate(0,-400)
  }
  else ctx.fillStyle = "green";
  ctx.rotate(degrees * Math.PI / 180);
  ctx.strokeStyle = "#000000";
  console.log(y);
  ctx.rect(x,y, width, height);
  ctx.fill();

  ctx.stroke();
  // ctx.restore();

}


function drawRect(x,y,width,height,degrees){
  ctx.save();

  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(degrees * Math.PI / 180);
  ctx.strokeStyle = "#000000";
  ctx.rect(-width / 2, -height / 2, width, height);
  ctx.fillStyle = "gold";
  ctx.fill();
  ctx.stroke()
  ctx.restore();
}
function drawSwingLine(x1Rope,x2Rope,y1Rope,y2Rope,y3Rope,degrees){
  ctx.save();

  ctx.beginPath();
  ctx.rotate(degrees * Math.PI / 180);

  ctx.lineTo(x1Rope,y1Rope);
  ctx.lineTo(x2Rope,y2Rope);

  ctx.moveTo(x1Rope,y1Rope);
  ctx.lineTo(x1Rope,y3Rope);
  ctx.moveTo(x2Rope,y2Rope);
  ctx.lineTo(x2Rope,y3Rope);

  ctx.stroke();
  ctx.restore();

}
