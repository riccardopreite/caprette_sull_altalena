
socket.on('connect', function() {
  socket.emit('my_event', {data: 'connected to the SocketServer...'});
});

socket.on('disconnect', function() {
  socket.disconnect()
});

socket.on('firstsCalculated', function(msg, cb) {
  console.log('firstsCalculated');
  toDraw0 = canvasList[0][firstMethode+"_frameList"]
  toDraw1 = canvasList[1][secondMethode+"_frameList"]
  drawMode(0)
  drawMode(1)
  freeze = false
  // initGraphMeasure()
});

socket.on('secondCalculated', function(msg, cb) {
  console.log('secondCalculated');
  drawMode(0)
  drawMode(1)
  showHideDiv("#formInputFiledContainer","#scoreContainer")
  showHideDiv("#swingControlButton","#geneticControlButton")
  toDraw0 = showingList
  toDraw1 = toCanvasCoordinates(msg,ctx1,bodyHeight1,gravity1,mass1,ropeLength1,firstMethode.replace("genetic",""))
  freeze = false
  // initGraphMeasure()
});

socket.on('standing', function(msg, cb) {
  console.log('standing');
  canvasList[0]["standing_frameList"] = toCanvasCoordinates(msg,ctx0,bodyHeight0,gravity0,mass0,ropeLength0,'standing')
});

socket.on('seated', function(msg, cb) {
  console.log('seated');
  canvasList[0]["seated_frameList"] = toCanvasCoordinates(msg,ctx0,bodyHeight0,gravity0,mass0,ropeLength0,'seated')
});

socket.on('realistic', function(msg, cb) {
  console.log('realistic');
  canvasList[0]["realistic_frameList"] = toCanvasCoordinates(msg,ctx0,bodyHeight0,gravity0,mass0,ropeLength0,'realistic')
});

socket.on('combined', function(msg, cb) {
  console.log('combined');
  canvasList[0]["combined_frameList"] = toCanvasCoordinates(msg,ctx0,bodyHeight0,gravity0,mass0,ropeLength0,'combined')
});

socket.on('standingSecond', function(msg, cb) {
  console.log('standingSecond');
  canvasList[1]["standing_frameList"] = toCanvasCoordinates(msg,ctx1,bodyHeight1,gravity1,mass1,ropeLength1,'standing')
});

socket.on('seatedSecond', function(msg, cb) {
  console.log('seatedSecond');
  canvasList[1]["seated_frameList"] = toCanvasCoordinates(msg,ctx1,bodyHeight1,gravity1,mass1,ropeLength1,'seated')
});

socket.on('realisticSecond', function(msg, cb) {
  console.log('realisticSecond');
  canvasList[1]["realistic_frameList"] = toCanvasCoordinates(msg,ctx1,bodyHeight1,gravity1,mass1,ropeLength1,'realistic')
});

socket.on('combinedSecond', function(msg, cb) {
  console.log('combinedSecond');
  canvasList[1]["combined_frameList"] = toCanvasCoordinates(msg,ctx1,bodyHeight1,gravity1,mass1,ropeLength1,'combined')

});
