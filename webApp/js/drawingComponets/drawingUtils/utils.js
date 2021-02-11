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

function firstDraw(){
  rope1 = new Rope(ctx1)
  swing1 = new Swing(ctx1)
  centerMass1 = new CenterMass(ctx1, showUpper0, showLower0)
  body1 = new Body(ctx1, bodyHeight)

  rope2 = new Rope(ctx2)
  swing2 = new Swing(ctx2)
  centerMass2 = new CenterMass(ctx2, showUpper1, showLower1)
  body2 = new Body(ctx2, bodyHeight)

  /*
  IMPORTANT: always put swing BEFORE body show.
  Body coordinates (and rotations) are calculated based on the Swing
   */
  rope1.show()
  swing1.show()
  centerMass1.show()
  body1.show()

  rope2.show()
  swing2.show()
  centerMass2.show()
  body2.show()
}

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
  var canvas1 = document.getElementById("graph1Canvas"+id),
      canvas2 = document.getElementById("graph2Canvas"+id);
  canvas1.height = $("#graph1Canvas"+id).height()
  canvas1.width = $("#graph1Canvas"+id).width()
  canvas2.height = $("#graph2Canvas"+id).height()
  canvas2.width = $("#graph2Canvas"+id).width()
}

function updateSwingTypeFirst(){
  console.log("CIAOOOOOOOOO");
  firstChange = true
  firstMethode = $("#swingType0 :selected").val();
  //To start draw new type now
  // playPausePressed(0)
  // playPausePressed(0)
}

function updateSwingTypeSecond(){
  console.log("CIAOOOOOOOOO");
  secondChange = true
  secondMethode = $("#swingType1 :selected").val();
  //To start draw new type now
  // playPausePressed(1)
  // playPausePressed(1)
}


function selectFirstMethods(resType ,res){
  if(firstMethode == resType) toDraw1 = canvasList[0][firstMethode+"_frameList"]
}
function selectSecondMethods(resType ,res){
  if(secondMethode == resType) toDraw2 = canvasList[1][secondMethode+"_frameList"]
}

function changeLower(id){
  if(id) centerMass1.showLower = $('#lowerCM0').is(":checked")
  else centerMass2.showLower = $('#lowerCM1').is(":checked")
}
function changeUpper(id){
  if(id) centerMass1.showUpper = $('#upperCM0').is(":checked")
  else centerMass2.showUpper = $('#upperCM1').is(":checked")

}
