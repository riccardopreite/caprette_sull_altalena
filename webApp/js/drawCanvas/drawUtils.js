function livePreview(){
  drawFirstBody()
  drawSecondBody()

  previewFrame0 = prepareFrame(0)
  ctx0.clearRect(0,0,canvas0.width,canvas0.height)

  console.log("ECCOMI");
  console.log(drawComp0);
  drawComp0.forEach(obj => {
    console.log(obj);
    obj.update(previewFrame0)
    obj.show()
  })
  ctx0.setTransform(1,0,0,1,0,0)

  /**************************/

  previewFrame1 = prepareFrame(1)

  ctx1.clearRect(0,0,canvas1.width,canvas1.height)

  drawComp1.forEach(obj => {
    obj.update(previewFrame1)
    obj.show()
  })

  ctx1.setTransform(1,0,0,1,0,0)
}

  function drawFirstBody(){
  rope0 = new Rope(ctx0)
  swing0 = new Swing(ctx0)
  centerMass0 = new CenterMass(ctx0, showUpper0, showLower0)
  body0 = new Body(ctx0, bodyHeight0*100)
  console.log(rope0);

  drawComp0 = [rope0, centerMass0, swing0, body0]

  drawComp0.forEach(obj => {
    obj.show()
  })

}
function drawSecondBody(){
  rope1 = new Rope(ctx1)
  swing1 = new Swing(ctx1)
  centerMass1 = new CenterMass(ctx1, showUpper1, showLower1)
  body1 = new Body(ctx1, bodyHeight1*100)

  drawComp1 = [rope1, centerMass1, swing1, body1]

  drawComp1.forEach(obj => {
    obj.show()
  })
}


function prepareFrame(id){
  let tmpFrame;
  var start_t = 0
  var cm = swingCM = upperCM = lowerCM = {}
  var SCALE_FACTOR = 100

  if(id){
    tmpFrame = new Frame(
      ctx1,

      start_t,
      phi1,
      w1,
      bodyPosition1,

      cm,
      swingCM,
      upperCM,
      lowerCM,

      secondMethode,
      gravity1,
      bodyHeight1,
      mass1,
      ropeLength1
    )
    // SCALE_FACTOR = 100 / (bodyHeight0 / bodyHeightDef)

  }
  else{
    tmpFrame = new Frame(
        ctx0,

        start_t,
        phi0,
        w0,
        bodyPosition0,

        cm,
        swingCM,
        upperCM,
        lowerCM,

        firstMethode,
        gravity0,
        bodyHeight0,
        mass0,
        ropeLength0
    )
  }
  tmpFrame.scaleFrame(SCALE_FACTOR)
  tmpFrame.traslateFrame()

  return tmpFrame
}
