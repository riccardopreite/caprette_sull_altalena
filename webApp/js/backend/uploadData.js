function uploadData(){
  if(firstInterval != undefined) clearInterval(firstInterval)
  if(secondInterval != undefined) clearInterval(secondInterval)
  // disabilita bottoni 
  data1 = getDataForCaluclateSwing(0)
  data2 = getDataForCaluclateSwing(1)
  socket.emit('handleRequest', {data1:data1,data2:data2});
  draw()
}

function getDataForCaluclateSwing(id){
  var gravity = document.getElementById("gravity"+id).value;
  var ropeLength = document.getElementById("ropeLength"+id).value;
  var height = document.getElementById("height"+id).value;
  var weigth = document.getElementById("mass"+id).value;
  var initPhi = document.getElementById("phi"+id).value;
  var initW = document.getElementById("w"+id).value;
  var methode = ""
  if(!id) firstMethode = "";
  else secondMethode = "";

  //Default value
  if(gravity =="") gravity = gravityDef
  if(ropeLength == "") ropeLength = ropeLengthDef
  if(height == "") height = bodyHeightDef
  if(weigth == "") weigth = bodyMass
  if(initPhi == "") initPhi = initPhiDef
  if(initW == "") initW = initWDef

  if(!id) firstMethode = $("#swingType0 :selected").val();
  else secondMethode = $("#swingType1 :selected").val();
  methode = $("#swingType"+id+" :selected").val();
  if(firstMethode == "") {
    alert("Scegli almeno un metodo da visualizzare") //set standing as default?
    return;
  }
  let data = {
              "gravity": gravity,
              "ropeLength": ropeLength,
              "height": height,
              "weigth": weigth,
              "phi": initPhi,
              "w": initW,
              "swingTypeFirst":methode,
              "isSecond":id
  }
  
  return data;
}
