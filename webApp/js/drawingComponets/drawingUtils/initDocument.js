function prepareCanvas(){
  ctx1.canvas.height = $("#parentCanvas0").height()
  ctx1.canvas.width = $("#parentCanvas0").width()
  ctx2.canvas.height = $("#parentCanvas1").height()
  ctx2.canvas.width = $("#parentCanvas1").width()
  $("#selectDiv0 :input").change(updateSwingTypeFirst)
  $("#selectDiv1 :input").change(updateSwingTypeSecond)
  firstDraw()
}
