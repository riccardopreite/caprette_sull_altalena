//Canvas misure: width="800" height="600"
var ropeLength = 2.7, // 2.7 metri default = metà del canvas| MAX?
  bodyHeight = 1.0,   // 1.0 metri default
  bodyMass = 50,      // 50.0kg default
  gravity = 9.8;      // 9.8 m/s^2 default

$( document ).ready(function() {
    console.log( "ready!" );
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");

  //First Rope Length
  ctx.lineTo(390,260);
  ctx.lineTo(380,280);

  ctx.moveTo(390,260);
  ctx.lineTo(390,0);
  ctx.moveTo(380,280);
  ctx.lineTo(380,0);
  ctx.stroke();

  ctx.beginPath()
  ctx.lineTo(380,260);
  ctx.lineTo(340,290);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineTo(340,290);
  ctx.lineTo(400,400);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineTo(400,400);
  ctx.lineTo(460,290);
  ctx.stroke();

  //Second Rope Length
  ctx.beginPath()
  ctx.lineTo(420,290);
  ctx.lineTo(410,310);
  //
  ctx.moveTo(420,290);
  ctx.lineTo(420,0);
  ctx.moveTo(410,310);
  ctx.lineTo(410,0);

  ctx.stroke();

  // ctx.beginPath()
  // ctx.lineTo(410,310);
  // ctx.lineTo(380,310);
  // ctx.stroke();




});
