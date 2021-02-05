var namespace = '/test';
var socket = io(namespace);

socket.on('connect', function() {
  socket.emit('my_event', {data: 'connected to the SocketServer...'});
});

socket.on('standing', function(msg, cb) {
  console.log('standing');
  standing_frameList = toCanvasCoordinates(msg)

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
  seated_frameList = toCanvasCoordinates(msg)

  // draw()
  if (cb)  cb();
  /********
  if(firstMethode == 'seated') drawFirst
  else if(secondMethode == 'seated') drawSecond
  ********/
});
socket.on('realistic', function(msg, cb) {
  console.log('realistic');
  realistic_frameList = toCanvasCoordinates(msg)

  // draw  ()
  if (cb) cb();
  /********
  if(firstMethode == 'realistic') drawFirst
  else if(secondMethode == 'realistic') drawSecond
  ********/
});
socket.on('combined', function(msg, cb) {
  console.log('combined');
  combined_frameList = toCanvasCoordinates(msg)

  toDraw = combined_frameList
  draw()

  // draw()
  if (cb) cb();
  /********
  if(firstMethode == 'combined') drawFirst =======================================> toDraw1 = combined_frameList
  else if(secondMethode == 'combined') drawSecond
  ********/

  /**
   * PSEUDO CODE
   * 
   * selectMethods("combined", msg)
   * draw()
   * 
   */
});


function selectMethods(resType ,res){
  if(firstMethode == resType) toDraw1 = toCanvasCoordinates(res)
  else if(secondMethode == resType) toDraw2 = toCanvasCoordinates(res)
}
