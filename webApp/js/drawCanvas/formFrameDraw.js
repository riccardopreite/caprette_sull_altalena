
/*******************************************************
        START UPDATE FUNCTION
*******************************************************/


function updatePhi(id,newPhi){
  initFrame[id].phi = newPhi
  if(id) phi1 = newPhi
  else phi0 = newPhi
  chooseObject(id)
}

function updateW(id,newW){
  initFrame[id].w = newW
  if(id) w1 = newW
  else w0 = newW
  chooseObject(id)
}

function updateGravity(id,newGravity){
  initFrame[id].gravity = gravity
  if(id) gravity1 = newGravity
  else gravity0 = newGravity
  chooseObject(id)
}

function updateMass(id,newMass){
  initFrame[id].mass = newMass
  if(id) mass1 = newMass
  else mass0 = newMass
  chooseObject(id)
}
function updateHeightFrame(id,newHeight){
  initFrame[id].height = newHeight
  if(id) bodyHeight1 = newHeight
  else bodyHeight0 = newHeight
  chooseObject(id)
}

function updateRopeLenght(id,newRLenght){
  initFrame[id].ropeLength = newRLenght
  if(id) ropeLength1 = newRLenght
  else ropeLength0 = newRLenght
  chooseObject(id)
}

function updateSwingType(id,newType){
  initFrame[id].bodyPosition = newType
  if(id) bodyPosition0 = newType
  else bodyPosition1 = newType
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
