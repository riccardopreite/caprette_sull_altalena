
function formMode(id){
  //control element
  $("#speedDownParent"+id).addClass("disabled");
  $("#speedUpParent"+id).addClass("disabled");
  $("#playButton"+id).addClass("disabled");
  $("#playButtonIcon"+id).text("play_arrow")

  //select
  $("#selectDiv"+id+" :input").prop( "disabled", false);

  //form & graph
  showHideGraph("#formDiv"+id,"#graphDiv"+id)
  //isDraw
  if(id) isDrawSecond = false
  else isDrawFirst = false
}
function drawMode(id){
  //control element
  $("#speedDownParent"+id).removeClass("disabled");
  $("#speedUpParent"+id).removeClass("disabled");
  $("#playButton"+id).removeClass("disabled");
  $("#playButtonIcon"+id).text("pause")

  //select
  $("#selectDiv"+id+" :input").prop( "disabled", true);

  //form & graph
  showHideGraph("#graphDiv"+id,"#formDiv"+id)


  //isDraw
  if(id) isDrawSecond = false
  else isDrawFirst = false
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

      function onPausePlayDrawButton(id){
        let playButtonIcon = document.getElementById("playButtonIcon"+id);
        if(playButtonIcon.innerHTML.includes("pause")) {

          if(id) isDrawSecond = false
          else isDrawFirst = false
          playButtonIcon.innerHTML = "play_arrow"
          disableInput(id,false)
        }
        else{
          playButtonIcon.innerHTML = "pause"
          if(id){
            if(secondChange){
              secondChange = false
              ctx1.clearRect(0,0,canvas1.width,canvas1.height)
              toDraw1 = canvasList[1][secondMethode+"_frameList"]
              frameCounterSecond = 0
            }
            isDrawSecond = true
          }
          else{
            if(firstChange){
              firstChange = false
              ctx0.clearRect(0,0,canvas0.width,canvas0.height)
              toDraw0 = canvasList[0][firstMethode+"_frameList"]
              frameCounterFirst = 0
            }
            isDrawFirst = true
          }
          disableInput(id,true)
        }
      }

      /*******************************************************
              END PLAY FUNCTION
      *******************************************************/


      /*******************************************************
              START SPEEDUP FUNCTION
      *******************************************************/

      function speedUpFirst(){
        $("#speedDownParent0").removeClass("disabled");
        firstIntervalTimer -= 100;
        if(firstIntervalTimer <= 100) {
          firstIntervalTimer = 100;
          $("#speedUpParent0").addClass("disabled");
        }
        clearInterval(firstInterval)
        firstInterval = setInterval(drawFirst, firstIntervalTimer);
        }
      function speedUpSecond(){
        $("#speedDownParent1").removeClass("disabled");
        secondIntervalTimer -= 100;
        if(secondIntervalTimer <= 100) {
          secondIntervalTimer = 100;
          $("#speedUpParent1").addClass("disabled");
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

      function speedDownFirst(){
        firstIntervalTimer += 100
        if(firstIntervalTimer > 1000) {
          firstIntervalTimer = 1000;
          $("#speedDownParent0").addClass("disabled");
        }
        $("#speedUpParent0").removeClass("disabled");
        clearInterval(firstInterval)
        firstInterval = setInterval(drawFirst, firstIntervalTimer);
      }
      function speedDownSecond(){
        secondIntervalTimer += 100
        if(secondIntervalTimer > 1000) {
          secondIntervalTimer = 1000;
          $("#speedDownParent1").addClass("disabled");
        }
        $("#speedUpParent1").removeClass("disabled");
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

function disableInput(id, bool){
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
