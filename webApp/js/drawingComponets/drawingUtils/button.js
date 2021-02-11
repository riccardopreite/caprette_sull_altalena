
 function playPausePressed(id){
   let className = document.getElementById("playButton"+id);
   console.log(className);
   if(className.innerHTML.includes("play")) className.innerHTML = "pause";
   else className.innerHTML = "play_arrow";
   if(id){
     if(secondChange){
       secondChange = false
       ctx2.clearRect(0,0,canvas2.width,canvas2.height)
       toDraw2 = switchList(secondMethode,1)
       frameCounterSecond = 0
     }
   }
   else{
     if(firstChange){
       firstChange = false
       ctx1.clearRect(0,0,canvas1.width,canvas1.height)
       toDraw1 = switchList(firstMethode,0)
       frameCounterFirst = 0
     }
   }
 }
