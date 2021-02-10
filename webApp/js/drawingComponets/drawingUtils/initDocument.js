function prepareCanvas(){
  ctx1.canvas.height = $("#canvas1Div").height()
  ctx1.canvas.width = $("#canvas1Div").width()
  ctx2.canvas.height = $("#canvas2Div").height()
  ctx2.canvas.width = $("#canvas2Div").width()
  firstDraw()
}
