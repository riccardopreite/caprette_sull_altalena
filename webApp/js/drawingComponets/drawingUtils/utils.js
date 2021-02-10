function switchList(methode,index){
  console.log(index);
  switch (methode) {
    case "standing":
    console.log(canvasList[index]["standing_frameList"]);
      return canvasList[index]["standing_frameList"]
      break;
    case "seated":
    console.log(canvasList[index]["seated_frameList"]);
      return canvasList[index]["seated_frameList"]
      break;
    case "realistic":
    console.log(canvasList[index]["realistic_frameList"]);
      return canvasList[index]["realistic_frameList"]
      break;
    case "combined":
    console.log(canvasList[index]["combined_frameList"]);
      return canvasList[index]["combined_frameList"]
      break;
    default:
  }
}

function first(text){
  firstChange = true
  firstMethode = text
}

function second(text){
  secondChange = true
  secondMethode = text
}


function selectFirstMethods(resType ,res){
  if(firstMethode == resType) toDraw1 = canvasList[0][firstMethode+"_frameList"]
}
function selectSecondMethods(resType ,res){
  if(secondMethode == resType) toDraw2 = canvasList[1][secondMethode+"_frameList"]
}
