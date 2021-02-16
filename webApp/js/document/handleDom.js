function switchGraphForm(id,showGraph){
  //if bool is true show Graph

  //if graph is visible form is hided and control button are enabled select is disabled
  //if form is visible graph is hided and control button are disabled select is enabled

  if(showGraph){
    showHideGraph("#graphTimeDiv"+id,"#formDiv"+id)
    switchPausePlayDrawButton(id,false)
    disableSpeedUpButton(id,false)
    disableSpeedDownButton(id,false)
    disableEnableInput(id, true)
  }
  else{
    showHideGraph("#formDiv"+id,"#graphTimeDiv"+id)
    switchPausePlayDrawButton(id,true)
    disableSpeedUpButton(id,true)
    disableSpeedDownButton(id,true)
    disableEnableInput(id, false)
  }

}


/*******************************************************
        START GRAPH FUNCTION
*******************************************************/

function showHideGraph(toShow,toHide){
  $(toShow).show()
  $(toHide).hide()
}


/***************************

function showSpeedGraph(id){
  var form = $("#formDiv"+id)
      graph = $("#graphSpeedDiv"+id)
  form.hide()
  graph.show()
}

function hideSpeedGraph(id){
  var form = $("#formDiv"+id)
      graph = $("#graphSpeedDiv"+id)
  form.show()
  graph.hide()
}

****************************/
/*******************************************************
        END GRAPH FUNCTION
*******************************************************/

/*******************************************************
        START FORM FUNCTION
*******************************************************/

$(".formInput").change(function(){
  getFormValue()
  livePreview()
})

function getFormValue(){
  firstMethode = $("#swingType0").val()
  secondMethode = $("#swingType1").val()
  if(firstMethode != oldFirst){
    firstChange = true
    oldFirst = firstMethode
  }
  if(secondMethode != oldSecond){
    secondChange = true
    oldSecond = secondMethode
  }
  var start_t = 0

  phi0 = $("#phi0").val()
  phi1 = $("#phi1").val()

  w0 = $("#w0").val()
  w1 = $("#w1").val()

  if (firstMethode == "standing") bodyPosition0 = "squat"
  else bodyPosition0 = "seat"

  if (secondMethode == "standing") bodyPosition1 = "squat"
  else bodyPosition1 = "seat"

  gravity0 = $("#gravity0").val()
  gravity1 = $("#gravity1").val()

  mass0 = $("#mass0").val()
  mass1 = $("#mass1").val()

  bodyHeight0 = $("#height0").val()
  bodyHeight1 = $("#height1").val()

  ropeLength0 = $("#ropeLength0").val()
  ropeLength1 = $("#ropeLength1").val()

  showUpper0 = $('#upperCM0').is(":checked")
  showLower0 = $('#lowerCM0').is(":checked")
  showUpper1 = $('#upperCM1').is(":checked")
  showLower1 = $('#lowerCM1').is(":checked")

}

/*******************************************************
        END FORM FUNCTION
*******************************************************/


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
              toDraw1 = canvasList[1][secondMethode+"_frameList"]
              frameCounterSecond = 0
            }
          }
          else{
            if(firstChange){
              firstChange = false
              ctx0.clearRect(0,0,canvas0.width,canvas0.height)
              toDraw0 = canvasList[0][firstMethode+"_frameList"]
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
  $("#selectDiv"+id+" :input").prop( "disabled", bool);
}

function changeLower(id){
  if(id) centerMass1.showLower = $('#lowerCM1').is(":checked")
  else centerMass0.showLower =  $('#lowerCM0').is(":checked")
}

function changeUpper(id){
  if(id) centerMass1.showUpper = $('#upperCM1').is(":checked")
  else centerMass0.showUpper = $('#upperCM0').is(":checked")
}

/*******************************************************
        END LISTENER FOR DRAWING COMPONENT FUNCTION
*******************************************************/
