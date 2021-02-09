function prepareCanvas(){
  var w = window.outerWidth - 400;// remove space for enviroment data and graph
  var h = window.innerHeight - 100;
  $("#firstEnvDiv").height(parseInt(h/2))
  $("#firstEnvDiv").width(w)
  $("#secondEnvDiv").height(parseInt(h/2))
  $("#secondEnvDiv").width(w)

  ctx1.canvas.height = $("#firstEnvDiv").height()
  ctx1.canvas.width = $("#firstEnvDiv").width()*80/100
  ctx2.canvas.height = $("#secondEnvDiv").height()
  ctx2.canvas.width = $("#secondEnvDiv").width()*80/100
}

function prepareDropDown(){
  let i = 0
  while(i < 4){
    console.log(i);
    $("#radioType"+i).on("change", firstChange);
    $("#radioTypesecond"+i).on("change", secondChange);
    i++
  }
}
