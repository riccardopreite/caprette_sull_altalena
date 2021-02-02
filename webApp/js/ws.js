var namespace = '/test';
var socket = io(namespace);

socket.on('connect', function() {
  socket.emit('my_event', {data: 'connected to the SocketServer...'});
});

socket.on('standing', function(msg, cb) {
  console.log('standing');
  standing_frameList = msg
  initList(standing_frameList)
  // draw()
  if (cb) cb();
  /********
  if(firstMethode == 'standing') drawFirst
  else if(secondMethode == 'standing') drawSecond
  ********/
});
socket.on('seated', function(msg, cb) {
  console.log('seated');
  seated_frameList = msg
  // initList(seated_frameList)
  if (cb)  cb();
  /********
  if(firstMethode == 'seated') drawFirst
  else if(secondMethode == 'seated') drawSecond
  ********/
});
socket.on('realistic', function(msg, cb) {
  console.log('realistic');
  realistic_frameList = msg
  // initList(realistic_frameList)
  realistic = msg
  if (cb) cb();
  /********
  if(firstMethode == 'realistic') drawFirst
  else if(secondMethode == 'realistic') drawSecond
  ********/
});
socket.on('combined', function(msg, cb) {
  console.log('combined');
  combined_frameList = msg
  // initList(combined_frameList)
  combined = msg
  if (cb) cb();
  /********
  if(firstMethode == 'combined') drawFirst
  else if(secondMethode == 'combined') drawSecond
  ********/
});

function initList(list){
  for(f in list){
    list[f]["swingCM"]["x"] += canvas.width/2
    list[f]["cm"]["x"] += canvas.width/2
    list[f]["swingCM"]["y"] = Math.abs(list[f]["swingCM"]["y"])+ canvas.height/2// * (-1)
    list[f]["cm"]["y"] = Math.abs(list[f]["cm"]["y"])// * (-1)
    if(list[f]["upperCM"] != {}){
      list[f]["upperCM"]["x"] += canvas.width/2
      list[f]["lowerCM"]["x"] += canvas.width/2
      list[f]["upperCM"]["y"] = Math.abs(list[f]["upperCM"]["y"])// * (-1)
      list[f]["lowerCM"]["y"] = Math.abs(list[f]["lowerCM"]["y"])// * (-1)
    }
  }
  console.log(list);
  toDraw = list
  draw()
}
