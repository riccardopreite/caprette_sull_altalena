//Canvas misure: width="800" height="600"
var ropeLengthDef = 2.7, // 2.7 metri default = metà del canvas| MAX?
bodyHeightDef = 1.0,   // 1.0 metri default
bodyMass = 20,      // 20.0kg default
gravityDef = 9.8;      // 9.8 m/s^2 default

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
  data1 = requestFirstCanvas()
  data2 = requestSecondCanvas()
  socket.emit('handleRequest', {data1:data1,data2:data2});

}

function requestFirstCanvas(){
  var gravity = document.getElementById("gravity").value;
  var ropeLength = document.getElementById("ropeLength").value;
  var babyHeight = document.getElementById("babyHeight").value;
  var babyWeigth = document.getElementById("babyWeigth").value;

  firstMethode = "";
  secondMethode = "";

  //Default value
  if(gravity =="") gravity = gravityDef
  if(ropeLength == "") ropeLength = ropeLengthDef
  if(babyHeight == "") babyHeight = bodyHeightDef
  if(babyWeigth == "") babyWeigth = bodyMass

  var index = 0;
  while(index < 4){
    let check = document.getElementById("radioType"+index);
    let label = document.getElementById("labelType"+index);
    if(check.checked){
      if(firstMethode == "") firstMethode = label.innerHTML.toLowerCase()
      else break;
    }
    index++;
  }
  if(firstMethode == "") {
    alert("Scegli almeno un metodo da visualizzare") //set standing as default?
    return;
  }
  onOffPauseButton(true)
  onOffPlayButton(true)
  let data = {
              "gravity": gravity,
              "ropeLength": ropeLength,
              "babyHeight": babyHeight,
              "babyWeigth": babyWeigth,
              "swingTypeFirst":firstMethode,
              "isSecond":0
  }
  return data;
}

function requestSecondCanvas(){
  var gravity = document.getElementById("secondgravity").value;
  var ropeLength = document.getElementById("secondropeLength").value;
  var babyHeight = document.getElementById("secondbabyHeight").value;
  var babyWeigth = document.getElementById("secondbabyWeigth").value;

  secondMethode = "";

  //Default value
  if(gravity =="") gravity = gravityDef
  if(ropeLength == "") ropeLength = ropeLengthDef
  if(babyHeight == "") babyHeight = bodyHeightDef
  if(babyWeigth == "") babyWeigth = bodyMass

  var index = 0;
  while(index < 4){
    let check = document.getElementById("radioTypesecond"+index);
    let label = document.getElementById("labelTypeSecond"+index);
    if(check.checked){
      if(secondMethode == "") secondMethode = label.innerHTML.toLowerCase()
      else break;
    }
    index++;
  }
  onOffPauseButton(true)
  onOffPlayButton(true)
  let data = {
              "gravity": gravity,
              "ropeLength": ropeLength,
              "babyHeight": babyHeight,
              "babyWeigth": babyWeigth,
              "swingTypeFirst":secondMethode,
              "isSecond":1
  }
  return data;
}
