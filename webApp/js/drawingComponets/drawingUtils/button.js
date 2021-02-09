
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
 }
 function firstPausePressed(){
   document.getElementById("firstPlayButton").disabled = false
   document.getElementById("firstPauseButton").disabled = true
 }

 function secondPlayPressed(){
   document.getElementById("secondPlayButton").disabled = true
   document.getElementById("secondPauseButton").disabled = false
 }
 function secondPausePressed(){
   document.getElementById("secondPlayButton").disabled = false
   document.getElementById("secondPauseButton").disabled = true


 }
