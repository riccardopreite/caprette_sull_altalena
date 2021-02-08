var namespace = '/test';
var socket = io(namespace);

function selectMethods(resType ,res){
  if(firstMethode == resType) toDraw1 = toCanvasCoordinates(res)
  else if(secondMethode == resType) toDraw2 = toCanvasCoordinates(res)
}
// ==================================================================================================
// SOCKET HANDLING

socket.on('connect', function() {
  socket.emit('my_event', {data: 'connected to the SocketServer...'});
});

socket.on('firstsCalculated', function(msg, cb) {
  console.log('firstsCalculated');
  draw()
});

socket.on('standing', function(msg, cb) {
  console.log('standing');
  standing_frameList = msg
  selectMethods("standing", standing_frameList)
});

socket.on('seated', function(msg, cb) {
  console.log('seated');
  seated_frameList = msg
  selectMethods("seated", seated_frameList)

  draw()


  // draw()
  if (cb)  cb();
  /********
  if(firstMethode == 'seated') drawFirst
  else if(secondMethode == 'seated') drawSecond
  ********/
});

socket.on('realistic', function(msg, cb) {
  console.log('realistic');
  realistic_frameList = msg
  selectMethods("realistic", realistic_frameList)
});

socket.on('combined', function(msg, cb) {
  console.log('combined');
  combined_frameList = msg
  selectMethods("combined", combined_frameList)
});
