/*******************************************************
        START MENU CONTROL BUTTON FUNCTION
*******************************************************/
      /*******************************************************
              START PLAY FUNCTION
      *******************************************************/

      function switchPausePlayDrawButton(id,bool){
        let playButton = document.getElementById("playButton"+id);
        let playButtonParent = document.getElementById("playButtonParent"+id);
        let css = "";
        if(bool) css = "pointer-events: none; cursor: default;";
        playButton.innerHTML = "pause";
        playButtonParent.style = css;
      }

      function playPausePressed(id){
        let className = document.getElementById("playButton"+id);
        if(className.innerHTML.includes("play")) {
          className.innerHTML = "pause";
          disableEnableInput(id,true)
          if(id){
            if(secondChange){
              secondChange = false
              ctx1.clearRect(0,0,canvas1.width,canvas1.height)
              toDraw1 = switchList(secondMethode,1)
              frameCounterSecond = 0
            }
          }
          else{
            if(firstChange){
              firstChange = false
              ctx0.clearRect(0,0,canvas0.width,canvas0.height)
              toDraw0 = switchList(firstMethode,0)
              frameCounterFirst = 0
            }
          }
        }
        else {
          className.innerHTML = "play_arrow";
          disableEnableInput(id,false)
        }
      }

      /*******************************************************
              END PLAY FUNCTION
      *******************************************************/


      /*******************************************************
              START SPEEDUP FUNCTION
      *******************************************************/

      function disableSpeedUpButton(id,bool){
        let speedUpButton = document.getElementById("speedUpParent"+id);
        let css = "";
        if(bool) css = "pointer-events: none; cursor: default;";
        speedUpButton.style = css;
      }
      function speedUpFirst(){
        disableSpeedDownButton(0,false)
        firstIntervalTimer -= 100;
        if(firstIntervalTimer <= 100) {
          firstIntervalTimer = 100;
          disableSpeedUpButton(0,true)
        }
        clearInterval(firstInterval)
        firstInterval = setInterval(drawFirst, firstIntervalTimer);
        }
      function speedUpSecond(){
        disableSpeedDownButton(1,false)
        secondIntervalTimer -= 100;
        if(secondIntervalTimer <= 100) {
          secondIntervalTimer = 100;
          disableSpeedUpButton(1,true)
        }
        clearInterval(secondInterval)
        secondInterval = setInterval(drawSecond, secondIntervalTimer);
      }

      /*******************************************************
              END  SPEEDUP FUNCTION
      *******************************************************/


      /*******************************************************
              START SPEEDDOWN FUNCTION
      *******************************************************/

      function disableSpeedDownButton(id,bool){
        let speedDownButton = document.getElementById("speedDownParent"+id);
        let css = "";
        if(bool) css = "pointer-events: none; cursor: default;";
        speedDownButton.style = css;
      }
      function speedDownFirst(){
        firstIntervalTimer += 100
        if(firstIntervalTimer > 1000) {
          firstIntervalTimer = 1000;
          disableSpeedDownButton(0,true)
        }
        disableSpeedUpButton(0,false)
        clearInterval(firstInterval)
        firstInterval = setInterval(drawFirst, firstIntervalTimer);
      }
      function speedDownSecond(){
        secondIntervalTimer += 100
        if(secondIntervalTimer > 1000) {
          secondIntervalTimer = 1000;
          disableSpeedDownButton(1,true)
        }
        disableSpeedUpButton(1,false)
        clearInterval(secondInterval)
        secondInterval = setInterval(drawSecond, secondIntervalTimer);
      }

      /*******************************************************
              END SPEEDDOWN FUNCTION
      *******************************************************/

/*******************************************************
        END MENU CONTROL BUTTON FUNCTION
*******************************************************/

/*******************************************************
        START LISTENER FOR DRAWING COMPONENT FUNCTION
*******************************************************/

function disableEnableInput(id, bool){
  let input = $("#selectDiv"+id+" :input")
  input.prop( "disabled", bool);
}

function updateSwingTypeFirst(){
  firstChange = true
  firstMethode = $("#swingType0 :selected").val();
}

function updateSwingTypeSecond(){
  secondChange = true
  secondMethode = $("#swingType1 :selected").val();
}

function changeLower(id){
	//fix <=================================
  if(id) centerMass0.showLower = $('#lowerCM0').is(":checked")
  else centerMass1.showLower = $('#lowerCM1').is(":checked")
}

function changeUpper(id){
  if(id) centerMass0.showUpper = $('#upperCM0').is(":checked")
  else centerMass1.showUpper = $('#upperCM1').is(":checked")
}

/*******************************************************
        END LISTENER FOR DRAWING COMPONENT FUNCTION
*******************************************************/
