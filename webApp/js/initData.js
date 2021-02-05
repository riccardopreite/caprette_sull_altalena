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

});
function uploadData(){
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
    let check = document.getElementById("checkboxType"+index);
    let label = document.getElementById("labelType"+index);
    if(check.checked){
      if(firstMethode == "") firstMethode = label.innerHTML.toLowerCase()
      else secondMethode = label.innerHTML.toLowerCase()
      if(secondMethode != "") break;
    }
    index++;
  }
  if(firstMethode == "") alert("Scegli almeno un metodo da visualizzare") //set standing as default?
  console.log("INITDATA");
  console.log(realistic);
  socket.emit('test', {data:{"gravity": gravity,
    "ropeLength": ropeLength,
    "babyHeight": babyHeight,
    "babyWeigth": babyWeigth,
    "swingTypeFirst":firstMethode,
    "swingTypeSecond":secondMethode

  }});
}
