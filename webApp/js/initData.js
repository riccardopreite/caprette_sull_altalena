//Canvas misure: width="800" height="600"
var ropeLengthDef = 2.7, // 2.7 metri default = metà del canvas| MAX?
bodyHeightDef = 1.0,   // 1.0 metri default
bodyMass = 20,      // 20.0kg default
gravityDef = 9.8,
initPhiDef = 0.01,
initWDef = 0.01;      // 9.8 m/s^2 default

var standing = [],
seated = [],
realistic = [],
combined = []

var firstMethode = "", secondMethode = "";

$( document ).ready(function() {
  console.log( "ready!" );
  prepareCanvas()
});
function uploadData(){
  data1 = getDataForCaluclateSwing(0)
  data2 = getDataForCaluclateSwing(1)
  console.log(data1);
  console.log(data2);
  socket.emit('handleRequest', {data1:data1,data2:data2});

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
  // onOffPauseButton(true)
  // onOffPlayButton(true)
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
