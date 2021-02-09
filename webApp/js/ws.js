var namespace = '/test';
var socket = io(namespace);

socket.on('connect', function() {
  socket.emit('my_event', {data: 'connected to the SocketServer...'});
});

socket.on('firstsCalculated', function(msg, cb) {
  console.log('firstsCalculated');
  onOffPauseButton(false)
  onOffPlayButton(true)
  draw()
});

socket.on('standing', function(msg, cb) {
  console.log('standing');
  canvasList[0]["standing_frameList"] = msg
  selectFirstMethods("standing", canvasList[0]["standing_frameList"])
});

socket.on('seated', function(msg, cb) {
  console.log('seated');
  canvasList[0]["seated_frameList"] = msg
  selectFirstMethods("seated", canvasList[0]["seated_frameList"])
});

socket.on('realistic', function(msg, cb) {
  console.log('realistic');
  canvasList[0]["realistic_frameList"] = msg
  selectFirstMethods("realistic", canvasList[0]["realistic_frameList"])
});

socket.on('combined', function(msg, cb) {
  console.log('combined');
  canvasList[0]["combined_frameList"] = msg
  selectFirstMethods("combined", canvasList[0]["combined_frameList"])
});

socket.on('standingSecond', function(msg, cb) {
  console.log('standingSecond');
  canvasList[1]["standing_frameList"] = msg
  selectSecondMethods("standing", canvasList[1]["standing_frameList"])
});

socket.on('seatedSecond', function(msg, cb) {
  console.log('seatedSecond');
  canvasList[1]["seated_frameList"] = msg
  selectSecondMethods("seated", canvasList[1]["seated_frameList"])
});

socket.on('realisticSecond', function(msg, cb) {
  console.log('realisticSecond');
  canvasList[1]["realistic_frameList"] = msg
  selectSecondMethods("realistic", canvasList[1]["realistic_frameList"])
});

socket.on('combinedSecond', function(msg, cb) {
  console.log('combinedSecond');
  canvasList[1]["combined_frameList"] = msg
  selectSecondMethods("combined", canvasList[1]["combined_frameList"])
});
