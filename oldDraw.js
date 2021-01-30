


var interval, istant, upper,radiusPositive = 20,radiusNegative = 20,posX = 0,negX = 0, dict = {};
function drawBodyCM(canvas, passed){
  var bodyCM = {}, swingCM = {}
  console.log("CIAOOOOOOO");
  console.log(canvas);
  canvas.beginPath()
  canvas.translate(0,0)
  canvas.translate(400,600)
  canvas.arc(0, 0, 5, 0, 2 * Math.PI);
  canvas.fillStyle = "green"
  canvas.fill();
  canvas.arc(20, 0, 20, 0, 2 * Math.PI);
  canvas.fillStyle = "green"
  canvas.fill();
  console.log(dict.length);
  dict = passed
  istant = 0, upper = parseInt(dict.length/1000)
  interval = setInterval(function(){
    // console.log(istant);
    if(istant >= dict.length) clearInterval(interval)
    else{
      canvas.beginPath()

      // canvas.translate(0,0)
      let rad = 20

      bodyCM = dict[istant]["bodyCM"]
      swingCM = dict[istant]["swingCM"]
      let xb = bodyCM["x"], yb = bodyCM["y"]
      let xs = swingCM["x"], ys = swingCM["y"]
      let colb = "blue", cols = "blue"
      if(istant > 0 ){
        if(xb < 0) {
          if(xb < negX && dict[istant-upper]["bodyCM"]["x"] >= 0 ){
            console.log("newMin");
            negX = xb
            radiusNegative = radiusNegative - 4
            // radiusPositive = radiusNegative
          }
          if(xb >= negX){
            console.log("old radius neg");

            radiusNegative = radiusNegative + 4

          }
          rad = radiusNegative
          cols = "red"
        }
        else {
          if(xb > posX && dict[istant-upper]["bodyCM"]["x"] <= 0 ){
            console.log("newMax");

            posX = xb
            radiusPositive = radiusPositive - 4
            // radiusNegative = radiusPositive
          }
          if(xb <= posX){
            console.log("old radius pos");
            radiusPositive = radiusPositive + 4
          }
          rad = radiusPositive
          cols =  "blue"
        }
      }

      if(xs < 0){
        colb = "red"
      }
      else{
        colb = "blue"
      }
      canvas.save()
      canvas.arc(xb, yb, rad, 0, 2 * Math.PI);
      canvas.fillStyle = colb
      canvas.fill();
      canvas.restore()

      canvas.beginPath()
      canvas.save()

      // canvas.translate(0,150)
      canvas.arc(xs, ys, rad, 0, 2 * Math.PI);
      canvas.fillStyle = cols
      canvas.fill();
      canvas.restore()
    }
    istant = istant + upper
  }, 10);


  //
  // for (var istant in dict){
  //
  // }
  //iterate on dict, get bodycm and draw it with phi

}
function drawSwingCM(canvas, dict){}
function drawRope(canvas, dict){

}


function drawSwingRect(x,y,width, height,degrees){
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
  var c = height * Math.cos(degrees)
  var t = height * Math.sin(degrees)
  ctx.rect(x,y, width, height);



  ctx.fill();
  // Reset transformation matrix to the identity matrix
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.restore();
  ctx.save();
  ctx.beginPath();

  ctx.translate(400,1000);
  ctx.fillStyle = "red";

  ctx.rect(c, t, 500, 1000);
  console.log("x");
  console.log(c);
  console.log("y");
  console.log(t);
  ctx.restore();

}

//WILL BE REMOVED BY MATTE CODE
// var ctx;// canvas Var
//
// // var xRectStart = 3100, yRectStart = 240, widthRect = 150, heightRect = 100, degreesRect = 25;
// var xRectStart = 380, yRectStart = 240, widthRect = 50, heightRect =100, degreesRect = 0;
// var height = 1000
// var degrees = 0;
// var x1Rope1Start = 390, x2Rope1Start = 380, y1Rope1Start = 260, y2Rope1Start = 280, y3Rope1Start = 0
// var x1Rope2Start = 450, x2Rope2Start = 440, y1Rope2Start = 290, y2Rope2Start = 310, y3Rope2Start = 0
// var c = document.getElementById("myCanvas");

// ctx = c.getContext("2d");
// ctx.beginPath();
//
//
// drawRect(xRectStart,yRectStart,widthRect,heightRect,degreesRect)
// // drawSwingRect(360,270,10,-1000)
// drawSwingRect(400,0,12,1000)
// drawSwingLine(x1Rope1Start,x2Rope1Start,y1Rope1Start,y2Rope1Start,y3Rope1Start,degrees)
// drawSwingLine(x1Rope2Start,x2Rope2Start,y1Rope2Start,y2Rope2Start,y3Rope2Start,degrees)
//
// function drawAgain(){
//   degrees+=1
//   height-=1
//   drawSwingRect(400,0,10,1000)
// }
//
//
//
// function drawRect(x,y,width,height,degrees){
//   ctx.save();
//
//   // ctx.translate(x + width / 2, y + height / 2);
//   ctx.translate(406,1000);
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
