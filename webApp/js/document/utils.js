/*******************************************************
                    START UTILS FUNCTION
*******************************************************/

function switchList(methode,index){
  console.log(index);
  switch (methode) {
    case "standing":
      return canvasList[index]["standing_frameList"]
      break;
    case "seated":
      return canvasList[index]["seated_frameList"]
      break;
    case "realistic":
      return canvasList[index]["realistic_frameList"]
      break;
    case "combined":
      return canvasList[index]["combined_frameList"]
      break;
    default:
  }
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

/*******************************************************
                    END UTILS FUNCTION
*******************************************************/

/****************************************************************************************

  OLD FUNCTION USED TO SWITCH FROM GRAPH TO INPUT DATA

function showHideGraph(id){
  if(document.getElementById("menuDiv"+id).style.display == 'none') {
    document.getElementById("menuDiv"+id).style.display = 'inline-block';
    document.getElementById("graphDiv"+id).style.display = 'none';
    document.getElementById("switchButton"+id).innerHTML = 'Grafici';
    document.getElementById("switchButton"+id).className = "btn btn-warning";
  }
  else{
    document.getElementById("menuDiv"+id).style.display = 'none';
    document.getElementById("graphDiv"+id).style.display = 'inline-block';
    document.getElementById("switchButton"+id).innerHTML = 'Dati Swing';
    document.getElementById("switchButton"+id).className = "btn btn-secondary";
    initCanvas(id)
  }
}

function initCanvas(id){
  var canvas0 = document.getElementById("graph1Canvas"+id),
      canvas1 = document.getElementById("graph2Canvas"+id);
  canvas0.height = $("#graph1Canvas"+id).height()
  canvas0.width = $("#graph1Canvas"+id).width()
  canvas1.height = $("#graph2Canvas"+id).height()
  canvas1.width = $("#graph2Canvas"+id).width()
}
****************************************************************************************/
