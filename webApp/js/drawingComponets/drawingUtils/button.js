
 function onOffPlayButton(bool){
   document.getElementById("firstPlayButton").disabled = bool
   document.getElementById("secondPlayButton").disabled = bool
 }
 function onOffPauseButton(bool){
   document.getElementById("firstPauseButton").disabled = bool
   document.getElementById("secondPauseButton").disabled = bool
 }

 function checkPause(button){
   return document.getElementById(button).disabled;
 }


 function firstPlayPressed(){
   document.getElementById("firstPlayButton").disabled = true
   document.getElementById("firstPauseButton").disabled = false
   if(firstChange){
     secondChange = false
     ctx1.clearRect(0,0,canvas1.width,canvas1.height)
     toDraw1 = switchList(firstMethode,0)
     frameCounterFirst = 0

   }
 }
 function firstPausePressed(){
   document.getElementById("firstPlayButton").disabled = false
   document.getElementById("firstPauseButton").disabled = true
 }

 function secondPlayPressed(){
   if(secondChange){
     secondChange = false
     ctx2.clearRect(0,0,canvas2.width,canvas2.height)
     toDraw2 = switchList(secondMethode,1)
     frameCounterSecond = 0
   }
   document.getElementById("secondPlayButton").disabled = true
   document.getElementById("secondPauseButton").disabled = false
 }
 function secondPausePressed(){
   document.getElementById("secondPlayButton").disabled = false
   document.getElementById("secondPauseButton").disabled = true


 }
