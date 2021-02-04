var namespace = '/test';
var socket = io(namespace);

socket.on('connect', function() {
  socket.emit('my_event', {data: 'connected to the SocketServer...'});
});

socket.on('standing', function(msg, cb) {
  console.log('standing');
  toCanvasFrame(msg,standing_frameList)
//
  // draw()
  if (cb) cb();
  /********
  if(firstMethode == 'standing') drawFirst
  else if(secondMethode == 'standing') drawSecond
  ********/
});
socket.on('seated', function(msg, cb) {
  console.log('seated');
  toCanvasFrame(msg,seated_frameList)
  // draw()
  if (cb)  cb();
  /********
  if(firstMethode == 'seated') drawFirst
  else if(secondMethode == 'seated') drawSecond
  ********/
});
socket.on('realistic', function(msg, cb) {
  console.log('realistic');
  toCanvasFrame(msg,realistic_frameList)
  // draw  ()
  if (cb) cb();
  /********
  if(firstMethode == 'realistic') drawFirst
  else if(secondMethode == 'realistic') drawSecond
  ********/
});
socket.on('combined', function(msg, cb) {
  console.log('combined');
  toCanvasFrame(msg,combined_frameList)
  toDraw = standing_frameList
  draw()
  // draw(   )
  if (cb) cb();
  /********
  if(firstMethode == 'combined') drawFirst
  else if(secondMethode == 'combined') drawSecond
  ********/
});
