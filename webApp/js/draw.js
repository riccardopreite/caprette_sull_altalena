//Canvas misure: width="800" height="600"
var ropeLength = 2.7, // 2.7 metri default = metà del canvas| MAX?
  bodyHeight = 1.0,   // 1.0 metri default
  bodyMass = 50,      // 50.0kg default
  gravity = 9.8;      // 9.8 m/s^2 default

var ctx;// canvas Var

// var xRectStart = 330, yRectStart = 240, widthRect = 150, heightRect = 100, degreesRect = 25;
var xRectStart = 380, yRectStart = 240, widthRect = 50, heightRect =100, degreesRect = 0;
var height = 300
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
  drawSwingRect(400,0,12,300)
  // drawSwingLine(x1Rope1Start,x2Rope1Start,y1Rope1Start,y2Rope1Start,y3Rope1Start,degrees)
  // drawSwingLine(x1Rope2Start,x2Rope2Start,y1Rope2Start,y2Rope2Start,y3Rope2Start,degrees)


});
function uploadData(){
  var gravity = document.getElementById("gravity").value;
  var ropeLength = document.getElementById("ropeLength").value;
  var babyHeight = document.getElementById("babyHeight").value;
  var babyWeigth = document.getElementById("babyWeigth").value;
  var swingType = {};
  var index = 0;

  while(index < 4){

    let check = document.getElementById("checkboxType"+index);
    if(check.checked) $.extend(swingType, check.value);
    index++;

  }
  var formData = new FormData();
  console.log(gravity);
  formData.append("gravity", gravity);
  formData.append("ropeLength", ropeLength);
  formData.append("babyHeight", babyHeight);
  formData.append("babyWeigth", babyWeigth);
  formData.append("swingType", swingType);
  console.log(formData);
  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:8000/handle_form");
  request.send(formData);
}
function drawAgain(){
  degrees+=1
  height-=1
  drawSwingRect(400,0,10,300)
}

function drawSwingRect(x,y,width, height){
  ctx.save();
  // ctx.clearRect(0, 0, document.getElementById("myCanvas").width, document.getElementById("myCanvas").height);
  ctx.beginPath();
  if(degrees){
    console.log("PC");
    ctx.fillStyle = "blue";
    ctx.translate(406,0);
    x = 0
  }
  else ctx.fillStyle = "green";
  ctx.rotate(degrees * Math.PI / 180);
  ctx.strokeStyle = "#000000";
  console.log(y);
  var c = height * Math.cos((degrees   )* Math.PI / 180)
  var t = height * Math.sin((degrees  )* Math.PI / 180)
  ctx.rect(x,y, width, height);



  ctx.fill();
  // Reset transformation matrix to the identity matrix
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.restore();
  ctx.save();
  ctx.beginPath();

  ctx.translate(400,300);
  ctx.fillStyle = "red";

  ctx.rect(c, t, 500, 300);
  console.log("x");
  console.log(c);
  console.log("y");
  console.log(t);
  ctx.restore();

}


function drawRect(x,y,width,height,degrees){
  ctx.save();

  // ctx.translate(x + width / 2, y + height / 2);
  ctx.translate(406,300);

  // ctx.rotate(degrees * Math.PI / 180);
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
