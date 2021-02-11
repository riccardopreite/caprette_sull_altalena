var namespace = '/test';
var socket = io(namespace);

socket.on('connect', function() {
  socket.emit('my_event', {data: 'connected to the SocketServer...'});
});

socket.on('firstsCalculated', function(msg, cb) {
  console.log('firstsCalculated');
  document.getElementById("playButton0").innerHTML = "pause";
  document.getElementById("playButton1").innerHTML = "pause";
  draw()
});

socket.on('standing', function(msg, cb) {
  console.log('standing');
  canvasList[0]["standing_frameList"] = toCanvasCoordinates(msg,ctx1)
  selectFirstMethods("standing", canvasList[0]["standing_frameList"])
});

socket.on('seated', function(msg, cb) {
  console.log('seated');
  canvasList[0]["seated_frameList"] = toCanvasCoordinates(msg,ctx1)
  selectFirstMethods("seated", canvasList[0]["seated_frameList"])
});

socket.on('realistic', function(msg, cb) {
  console.log('realistic');
  canvasList[0]["realistic_frameList"] = toCanvasCoordinates(msg,ctx1)
  selectFirstMethods("realistic", canvasList[0]["realistic_frameList"])
});

socket.on('combined', function(msg, cb) {
  console.log('combined');
  canvasList[0]["combined_frameList"] = toCanvasCoordinates(msg,ctx1)
  selectFirstMethods("combined", canvasList[0]["combined_frameList"])
});

socket.on('standingSecond', function(msg, cb) {
  console.log('standingSecond');
  canvasList[1]["standing_frameList"] = toCanvasCoordinates(msg,ctx2)
  selectSecondMethods("standing", canvasList[1]["standing_frameList"])
});

socket.on('seatedSecond', function(msg, cb) {
  console.log('seatedSecond');
  canvasList[1]["seated_frameList"] = toCanvasCoordinates(msg,ctx2)
  selectSecondMethods("seated", canvasList[1]["seated_frameList"])
});

socket.on('realisticSecond', function(msg, cb) {
  console.log('realisticSecond');
  canvasList[1]["realistic_frameList"] = toCanvasCoordinates(msg,ctx2)
  selectSecondMethods("realistic", canvasList[1]["realistic_frameList"])
});

socket.on('combinedSecond', function(msg, cb) {
  console.log('combinedSecond');
  canvasList[1]["combined_frameList"] = toCanvasCoordinates(msg,ctx2)
  selectSecondMethods("combined", canvasList[1]["combined_frameList"])
});
