
/*******************************************************
        START UPDATE FUNCTION
*******************************************************/


function updatePhi(id,newPhi){
  initFrame[id].phi = newPhi
  chooseObject(id)
}

function updateHeightFrame(id,newHeight){
  if(id){
      bodyHeight1 = newHeight
    }
    else{
      bodyHeight0 = newHeight
    }
  chooseObject(id)
}

function updateRopeLenght(id,newRLenght){
  if(id) ropeLength1 = newRLenght
  else ropeLength0 = newRLenght
  chooseObject(id)
}

/*******************************************************
        END UPDATE FUNCTION
*******************************************************/

/*******************************************************
        START REDRAW FORM FRAME FUNCTION
*******************************************************/

function reDrawFirstFrame(rope,swing,centerMass,body,frame,halfHeight,ropeLen,phi){

  var SCALE_FACTOR = 100 / ((halfHeight*2) / (bodyHeightDef*1))

  let swingCM = calculateSwingCM(ropeLen,phi)
  let upperCM = calculateUpperCM(ropeLen,phi,halfHeight)
  let cm = calculateCM(ropeLen,phi)
  let lowerCM = calculateLowerCM(ropeLen,phi,halfHeight)

  frame.updateCM(swingCM,upperCM,cm,lowerCM)
  frame.scaleFrame(SCALE_FACTOR)
  frame.traslateFrame()
  frame.ctx.clearRect(0,0,frame.ctx.canvas.width,frame.ctx.canvas.height)

  updateSwing(rope,swing,frame)
  updateBody(centerMass,body,frame)
  showFrame(rope,swing,centerMass,body)
  
  frame.ctx.setTransform(1,0,0,1,0,0)
}

/*******************************************************
        END REDRAW FORM FRAME FUNCTION
*******************************************************/

/*******************************************************
        START SEATED CENTER MASS FUNCTION
*******************************************************/

function calculateSwingCM(ropeLen,phi){
  let tmp = {}
  tmp["x"] = ropeLen*Math.sin(phi)
  tmp["y"] = -(ropeLen*Math.cos(phi))
  return tmp;
}

function calculateUpperCM(ropeLen,phi,halfHeight){
  let tmp = {}
  tmp["x"] = ropeLen*Math.sin(phi) - halfHeight*Math.sin(phi)
  tmp["y"] = -(ropeLen) + halfHeight*Math.cos(phi)
  return tmp;
}

function calculateCM(ropeLen,phi){
  let tmp = {}
  tmp["x"] = ropeLen*Math.sin(phi)
  tmp["y"] = -(ropeLen*Math.cos(phi))
  return tmp;
}

function calculateLowerCM(ropeLen,phi,halfHeight){
  let tmp = {}
  tmp["x"] = ropeLen*Math.sin(phi) + halfHeight*Math.sin(phi)
  tmp["y"] = -(ropeLen*Math.cos(phi)) - halfHeight*Math.cos(phi)
  return tmp;
}



/*******************************************************
        END CENTER MASS FUNCTION
*******************************************************/
