//CAN BE REMOVED BY DOING THIS IN "firstsCalculated" SOCKET IN WS.JS:
/*************************
toDraw0 = canvasList[0][firstMethode+"_frameList"]
toDraw1 = canvasList[1][secondMethode+"_frameList"]
*************************/

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function selectFirstMethods(resType ,res){
  if(firstMethode == resType) toDraw0 = canvasList[0][firstMethode+"_frameList"]
}
function selectSecondMethods(resType ,res){
  if(secondMethode == resType) toDraw1 = canvasList[1][secondMethode+"_frameList"]
}
