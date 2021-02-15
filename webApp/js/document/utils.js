/*******************************************************
                    START UTILS FUNCTION
*******************************************************/

function chooseObject(id){
  if(id){
    initSecondBody()
    reDrawFirstFrame(rope1,swing1,centerMass1,body1,initFrame[id],bodyHeight0/2,ropeLength1,initFrame[id].phi);

  }
  else {
    initFirstBody()
    reDrawFirstFrame(rope0,swing0,centerMass0,body0,initFrame[id],bodyHeight1/2,ropeLength0,initFrame[id].phi);
  }
}

function switchList(methode,index){
  return canvasList[index][methode+"_frameList"]
}

function selectFirstMethods(resType ,res){
  if(firstMethode == resType) toDraw0 = canvasList[0][firstMethode+"_frameList"]
}
function selectSecondMethods(resType ,res){
  if(secondMethode == resType) toDraw1 = canvasList[1][secondMethode+"_frameList"]
}

function controlSelectSystem(id,bool){
  disableEnableInput(id,bool);
}

// play/pause speed
function controlButtonSystem(id,bool){
  disableEnableControlButton(id,!bool)
}

function disableEnableControlButton(id,bool){
  switchPausePlayDrawButton(id,bool)
  disableSpeedUpButton(id,bool)
  disableSpeedDownButton(id,bool)
}

function updateSwing(rope,swing,currentFrame){
  rope.update(currentFrame)
  swing.update(currentFrame)
}
function updateBody(centerMass,body,currentFrame){
  centerMass.update(currentFrame)
  body.update(currentFrame)
}

function showFrame(rope,swing,centerMass,body){
  rope.show()
  centerMass.show()
  swing.show()
  body.show()
}

function updateHeight(data1,data2){
  bodyHeight0 = data1["height"]
  bodyHeight1 = data2["height"]
}
/*******************************************************
                    END UTILS FUNCTION
*******************************************************/

/****************************************************************************************

  OLD FUNCTION USED TO SWITCH FROM GRAPH TO INPUT DATA


****************************************************************************************/
