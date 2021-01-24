var namespace = '/test';
var socket = io(namespace);

socket.on('connect', function() {
  socket.emit('my_event', {data: 'connected to the SocketServer...'});
});

socket.on('standing', function(msg, cb) {
  console.log('standing');
  standing = msg
  if (cb) cb();
  /********
  if(firstMethode == 'standing') drawFirst
  else if(secondMethode == 'standing') drawSecond
  ********/
});
socket.on('seated', function(msg, cb) {
  console.log('seated');
  seated = msg
  if (cb)  cb();
  /********
  if(firstMethode == 'seated') drawFirst
  else if(secondMethode == 'seated') drawSecond
  ********/
});
socket.on('realistic', function(msg, cb) {
  console.log('realistic');
  realistic = msg
  if (cb) cb();
  /********
  if(firstMethode == 'realistic') drawFirst
  else if(secondMethode == 'realistic') drawSecond
  ********/
});
socket.on('combined', function(msg, cb) {
  console.log('combined');
  combined = msg
  if (cb) cb();
  /********
  if(firstMethode == 'combined') drawFirst
  else if(secondMethode == 'combined') drawSecond
  ********/
});
