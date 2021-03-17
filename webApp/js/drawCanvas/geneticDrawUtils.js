function drawRecordBody() {
  console.log("draw record");
  showingList = goBest(tmpRecord.brain)
  graphOffset = parseInt(showingList.length/FRAME_GRAPH_OFFEST)

  showingIndex = 0
  draw=true
  timeGraph0.resetChart()
  speedGraph0.resetChart()
  timeGraph0 = new Graph(ctxTime0,"Time/Angle graph","phi(rad)","time(s)","radiant angle")
  speedGraph0 = new Graph(ctxSpeed0,"Angular Speed/Angle graph","angular speed(rad/s)","phi(rad)","angular speed")

  if (patience == 0) {
      stopTraining = true
      draw = false
      $("#trainLog").text("")
      compareSwingDraw()
  }
  else drawBest()
}

function goBest(brain) {
  var tmpBody = new GeneticBody(geneticCtx, initialStateFrame, brain)
  var tmpRope = new Rope(geneticCtx, initialStateFrame)
  var tmpSwing = new Swing(geneticCtx, initialStateFrame)
  let trainedFrame = [],
    timer = 0;
  while (timer < STEPS && Math.abs(tmpBody.currentFrame.phi) < 1.309) {
    nextPosition = tmpBody.think()
    nextFrame = getNextFrame(tmpBody.currentFrame, nextPosition,tmpBody)
    tmpBody.update(nextFrame)

    let next = nextFrame.clone()
    next.scaleFrame()
    next.translateFrame()

    tmpRope.update(next)
    tmpSwing.update(next)

    trainedFrame.push(nextFrame)
    // update
    timer += 0.001
  }
  return trainedFrame;
}



function drawBest() {
  if(patience != PATIENCE_MAX){
    $("#trainLog").text("Training Generation number: " + genCounter)
    if (patience) stopTraining = false;
    else{
      $("#saveGenetic").removeClass("disabled");
    }
    setTimeout(train,1000)
  }
  else if(draw){
    $("#trainLog").text("Drawing new best for " + STEPS + " steps")
    let initFrame = showingList[0]
    var tmpBody = new GeneticBody(geneticCtx, initFrame)
    var tmpRope = new Rope(geneticCtx, initFrame)
    var tmpSwing = new Swing(geneticCtx, initFrame)
    if (showingIndex < showingList.length) {
      let counter = 0
      while(counter < 5){
        if (showingIndex >= showingList.length) break;
        let frame = showingList[showingIndex]
        //ADD GRAPH
        geneticCtx.clearRect(0, 0, canvas0.width, canvas0.height)
        tmpBody.update(frame)
        tmpRope.update(frame)
        tmpSwing.update(frame)

        //show frame
        tmpRope.show()
        tmpSwing.show()
        tmpBody.show()
        geneticCtx.setTransform(1, 0, 0, 1, 0, 0)
        if( (!(showingIndex % graphOffset)) || (showingIndex == (showingList.length-1)) ){
          timeGraph0.addScatterPoint(frame.t.toFixed(3), frame.phi.toFixed(3))
          speedGraph0.addScatterPoint(frame.phi.toFixed(3), frame.w.toFixed(3))
        }
        showingIndex = showingIndex + 1
        counter++
      }

      setTimeout(drawBest,GENERATION_TIMEOUT)
    } else {
      if (patience) stopTraining = false;
      else{
        $("#saveGenetic").removeClass("disabled");
      }
      //refresh generation in score log with actual generation and print only training....

      $("#trainLog").text("Training Generation number: " + genCounter)
      //add graph of score while training generation

      setTimeout(train,300)
    }
  }
}
