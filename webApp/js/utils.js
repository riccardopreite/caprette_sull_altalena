
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

//CAN BE REMOVED BY DOING THIS IN "firstsCalculated" SOCKET IN WS.JS:
/*************************
toDraw0 = canvasList[0][firstMethode+"_frameList"]
toDraw1 = canvasList[1][secondMethode+"_frameList"]
*************************/
function selectFirstMethods(resType ,res){
  if(firstMethode == resType) toDraw0 = res
}
function selectSecondMethods(resType ,res){
  if(secondMethode == resType) toDraw1 = res
}
