
socket.on('connect', function() {
  socket.emit('my_event', {data: 'connected to the SocketServer...'});
});

socket.on('firstsCalculated', function(msg, cb) {
  console.log('firstsCalculated');
  drawMode(0)
  drawMode(1)
});

socket.on('standing', function(msg, cb) {
  console.log('standing');
  canvasList[0]["standing_frameList"] = toCanvasCoordinates(msg,ctx0,bodyHeight0,gravity0,mass0,ropeLength0,'standing')
  selectFirstMethods("standing", canvasList[0]["standing_frameList"])
});

socket.on('seated', function(msg, cb) {
  console.log('seated');
  canvasList[0]["seated_frameList"] = toCanvasCoordinates(msg,ctx0,bodyHeight0,gravity0,mass0,ropeLength0,'seated')
  selectFirstMethods("seated", canvasList[0]["seated_frameList"])
});

socket.on('realistic', function(msg, cb) {
  console.log('realistic');
  canvasList[0]["realistic_frameList"] = toCanvasCoordinates(msg,ctx0,bodyHeight0,gravity0,mass0,ropeLength0,'realistic')
  selectFirstMethods("realistic", canvasList[0]["realistic_frameList"])
});

socket.on('combined', function(msg, cb) {
  console.log('combined');
  canvasList[0]["combined_frameList"] = toCanvasCoordinates(msg,ctx0,bodyHeight0,gravity0,mass0,ropeLength0,'combined')
  selectFirstMethods("combined", canvasList[0]["combined_frameList"])
});

socket.on('standingSecond', function(msg, cb) {
  console.log('standingSecond');
  canvasList[1]["standing_frameList"] = toCanvasCoordinates(msg,ctx1,bodyHeight1,gravity1,mass1,ropeLength1,'standing')
  selectSecondMethods("standing", canvasList[1]["standing_frameList"])
});

socket.on('seatedSecond', function(msg, cb) {
  console.log('seatedSecond');
  canvasList[1]["seated_frameList"] = toCanvasCoordinates(msg,ctx1,bodyHeight1,gravity1,mass1,ropeLength1,'seated')
  selectSecondMethods("seated", canvasList[1]["seated_frameList"])
});

socket.on('realisticSecond', function(msg, cb) {
  console.log('realisticSecond');
  canvasList[1]["realistic_frameList"] = toCanvasCoordinates(msg,ctx1,bodyHeight1,gravity1,mass1,ropeLength1,'realistic')
  selectSecondMethods("realistic", canvasList[1]["realistic_frameList"])
});

socket.on('combinedSecond', function(msg, cb) {
  console.log('combinedSecond');
  canvasList[1]["combined_frameList"] = toCanvasCoordinates(msg,ctx1,bodyHeight1,gravity1,mass1,ropeLength1,'combined')
  selectSecondMethods("combined", canvasList[1]["combined_frameList"])
});
