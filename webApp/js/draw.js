


var interval, istant, upper,radiusPositive = 20,radiusNegative = 20,posX = 0,negX = 0, dict = {},timer = 10,canvas;




function drawBodyCM(can, passed){
  canvas = can
  canvas.beginPath()
  canvas.translate(0,0)
  canvas.translate(400,150)
  dict = passed
  console.log(dict.length);
  istant = 0
  upper = parseInt(dict.length/1000)
  interval = setInterval(drawInterval, timer);
}
function drawSwingCM(canvas, dict){}
function drawRope(canvas, dict){}

function drawInterval(){

  var bodyCM = {}, swingCM = {}
  if(istant >= dict.length) clearInterval(interval)
  else{
    canvas.beginPath()
    canvas.translate(0,0)

    bodyCM = dict[istant]["bodyCM"]
    swingCM = dict[istant]["swingCM"]

    let xb = bodyCM["x"], yb = bodyCM["y"]
    let xs = swingCM["x"], ys = swingCM["y"]

    yb = Math.cos(((dict[istant]["phi"]))+0)*135
    xb = Math.sin(((dict[istant]["phi"]))+0)*135

    ys = Math.cos(((dict[istant]["phi"]))+0)*135
    xs = Math.sin(((dict[istant]["phi"]))+0)*135
    //Draw body center
    canvas.save()
    canvas.arc(xb, yb, 1, 0, 2 * Math.PI);
    canvas.stroke();
    canvas.restore()

    //Draw rope

    canvas.save()
    canvas.beginPath();

    canvas.translate(0,0)
    canvas.moveTo(0, 0);
    canvas.lineTo(xs, ys+150);
    canvas.stroke();

    canvas.restore()

    //Draw swing center

    canvas.beginPath()

    canvas.save()

    canvas.translate(0,150)
    canvas.arc(xs, ys, 1, 0, 2 * Math.PI);
    canvas.stroke();

    canvas.restore()

    // canvas.beginPath();
    // canvas.translate(0,0)
    //
    // canvas.stroke();
    // canvas.restore()
  }
  istant = istant + upper
}




function slowDownDraw(){
  timer += 10
  if(timer > 100) timer = 100
  clearInterval(interval)
  interval = setInterval(drawInterval, timer);
}

function speedUpDraw(){
  timer -= 10
  if(!timer) timer = 1
  clearInterval(interval)
  interval = setInterval(drawInterval, timer);
}



// function drawSwingRect(x,y,width, height,degrees){
  //   ctx.save();
  //   // ctx.clearRect(0, 0, document.getElementById("myCanvas").width, document.getElementById("myCanvas").height);
  //   ctx.beginPath();
  //   if(degrees){
    //     console.log("PC");
    //     ctx.fillStyle = "blue";
    //     ctx.translate(406,0);
    //     x = 0
    //   }
    //   else ctx.fillStyle = "green";
    //   ctx.rotate(degrees * Math.PI / 180);
    //   ctx.strokeStyle = "#000000";
    //   console.log(y);
    //   var c = height * Math.cos(degrees)
    //   var t = height * Math.sin(degrees)
    //   ctx.rect(x,y, width, height);
    //
    //
    //
    //   ctx.fill();
    //   // Reset transformation matrix to the identity matrix
    //   ctx.setTransform(1, 0, 0, 1, 0, 0);
    //
    //   ctx.restore();
    //   ctx.save();
    //   ctx.beginPath();
    //
    //   ctx.translate(400,300);
    //   ctx.fillStyle = "red";
    //
    //   ctx.rect(c, t, 500, 300);
    //   console.log("x");
    //   console.log(c);
    //   console.log("y");
    //   console.log(t);
    //   ctx.restore();
    //
    // }
//WILL BE REMOVED BY MATTE CODE
// var ctx;// canvas Var
//
// // var xRectStart = 330, yRectStart = 240, widthRect = 150, heightRect = 100, degreesRect = 25;
// var xRectStart = 380, yRectStart = 240, widthRect = 50, heightRect =100, degreesRect = 0;
// var height = 300
// var degrees = 0;
// var x1Rope1Start = 390, x2Rope1Start = 380, y1Rope1Start = 260, y2Rope1Start = 280, y3Rope1Start = 0
// var x1Rope2Start = 450, x2Rope2Start = 440, y1Rope2Start = 290, y2Rope2Start = 310, y3Rope2Start = 0
// var c = document.getElementById("myCanvas");

// ctx = c.getContext("2d");
// ctx.beginPath();
//
//
// drawRect(xRectStart,yRectStart,widthRect,heightRect,degreesRect)
// // drawSwingRect(360,270,10,-300)
// drawSwingRect(400,0,12,300)
// drawSwingLine(x1Rope1Start,x2Rope1Start,y1Rope1Start,y2Rope1Start,y3Rope1Start,degrees)
// drawSwingLine(x1Rope2Start,x2Rope2Start,y1Rope2Start,y2Rope2Start,y3Rope2Start,degrees)
//
// function drawAgain(){
//   degrees+=1
//   height-=1
//   drawSwingRect(400,0,10,300)
// }
//
//
//
// function drawRect(x,y,width,height,degrees){
//   ctx.save();
//
//   // ctx.translate(x + width / 2, y + height / 2);
//   ctx.translate(406,300);
//
//   // ctx.rotate(degrees * Math.PI / 180);
//   ctx.strokeStyle = "#000000";
//   ctx.rect(-width / 2, -height / 2, width, height);
//   ctx.fillStyle = "gold";
//   ctx.fill();
//   ctx.stroke()
//   ctx.restore();
// }
// function drawSwingLine(x1Rope,x2Rope,y1Rope,y2Rope,y3Rope,degrees){
//   ctx.save();
//
//   ctx.beginPath();
//   ctx.rotate(degrees * Math.PI / 180);
//
//   ctx.lineTo(x1Rope,y1Rope);
//   ctx.lineTo(x2Rope,y2Rope);
//
//   ctx.moveTo(x1Rope,y1Rope);
//   ctx.lineTo(x1Rope,y3Rope);
//   ctx.moveTo(x2Rope,y2Rope);
//   ctx.lineTo(x2Rope,y3Rope);
//
//   ctx.stroke();
//   ctx.restore();
//
// }
