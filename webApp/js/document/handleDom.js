document.addEventListener("click", e => {
    if (freeze) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);



/*******************************************************
        START HANDLE GENETIC DIV FUNCTION
*******************************************************/

function saveBrain(){
  var bestBrain = {}
  //add get the best
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bestBrain));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "brain.json");
  dlAnchorElem.click();
}
function uploadBrain(){
  let input = document.getElementById("loadInput")
  var reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(input.files[0]);
}

function addLogMsgDOM(string){
  $("#geneticLog").append(string+"\n")
}

function updateMaxPhi(newPhi){
  $("#phiScore").text(newPhi)
}

function updateJumper(newJumper){
  $("#jumpCounter").text(newJumper)
}

/*******************************************************
        SWITCH DRAW FORM MODE FUNCTION
*******************************************************/


function formMode(id){
  //control element
  $("#speedDownParent"+id).addClass("disabled");
  $("#speedUpParent"+id).addClass("disabled");
  $("#playButton"+id).addClass("disabled");
  $("#playButtonIcon"+id).text("play_arrow")

  //select
  $("#selectDiv"+id+" :input").prop( "disabled", false);

  //form & graph & genetic
  showHideDiv("#formDiv"+id,"#graphDiv"+id)
  if(!id)  showHideDiv("#formDiv"+id,"#geneticDiv")

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

  //form & graph & genetic
  showHideDiv("#graphDiv"+id,"#formDiv"+id)
  if(!id)  showHideDiv("#graphDiv"+id,"#geneticDiv")


  //isDraw
  if(id) isDrawSecond = true
  else isDrawFirst = true
}
/*******************************************************
        START GRAPH FUNCTION
*******************************************************/

function showHideDiv(toShow,toHide){
  $(toShow).removeClass("hide")
  $(toHide).addClass("hide")
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
    $("#playButtonIcon0").text("play_arrow")
  }
  if(secondMethode != oldSecond){
    secondChange = true
    oldSecond = secondMethode
    $("#playButtonIcon1").text("play_arrow")

  }
  var start_t = 0

  phi0 = $("#phi0").val()
  phi1 = $("#phi1").val()

  w0 = $("#w0").val()
  w1 = $("#w1").val()

  if (firstMethode.includes("standing")) bodyPosition0 = "squat"
  else bodyPosition0 = "seat"

  if (secondMethode.includes("standing")) bodyPosition1 = "squat"
  else bodyPosition1 = "seat"

  gravity0 = ($("#gravity0").val() > $("#gravity0").attr("min") ? $("#gravity0").val() : $("#gravity0").attr("min"))
  gravity1 = ($("#gravity1").val() > $("#gravity1").attr("min") ? $("#gravity1").val() : $("#gravity1").attr("min"))

  mass0 = ($("#mass0").val() > $("#mass0").attr("min") ? $("#mass0").val() : $("#mass0").attr("min"))
  mass1 = ($("#mass1").val() > $("#mass1").attr("min") ? $("#mass1").val() : $("#mass1").attr("min"))

  bodyHeight0 = ($("#height0").val() > $("#height0").attr("min") ? $("#height0").val() : $("#height0").attr("min"))
  bodyHeight1 = ($("#height1").val() > $("#height1").attr("min") ? $("#height1").val() : $("#height1").attr("min"))

  ropeLength0 = ($("#ropeLength0").val() > $("#ropeLength0").attr("min") ? $("#ropeLength0").val() : $("#ropeLength0").attr("min"))
  ropeLength1 = ($("#ropeLength1").val() > $("#ropeLength1").attr("min") ? $("#ropeLength1").val() : $("#ropeLength1").attr("min"))

  showUpper0 = $('#upperCM0').is(":checked")
  showLower0 = $('#lowerCM0').is(":checked")
  showUpper1 = $('#upperCM1').is(":checked")
  showLower1 = $('#lowerCM1').is(":checked")

  $("#gravity0").val(gravity0)
  $("#gravity1").val(gravity1)
  $("#mass0").val(mass0)
  $("#mass1").val(mass1)
  $("#height0").val(bodyHeight0)
  $("#height1").val(bodyHeight1)
  $("#ropeLength0").val(ropeLength0)
  $("#ropeLength1").val(ropeLength1)
  if(firstMethode.includes("genetic")){
    console.log("PORCODIO");
    showHideDiv("#geneticDiv","#graphDiv0")
    showHideDiv("#geneticDiv","#formDiv0")
  }
  return new Frame(
    ctx0,
    0,
    phi0,
    w0,
    bodyPosition0,
    [],
    [],
    [],
    [],
    firstMethode,
    gravity0,
    bodyHeight0,
    mass0,
    ropeLength0
  )
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
        if(playButtonIcon.innerHTML.includes("refresh")) {
          playButtonIcon.innerHTML = "pause"
          if(id) {
            isDrawSecond = true
            frameCounterSecond = 0;
          }
          else {
            isDrawFirst = true
            frameCounterFirst = 0;
          }
          return
        }
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
  if(id){
    centerMass1.showLower = $('#lowerCM1').is(":checked")
    showLower1 = $('#lowerCM1').is(":checked")
  }
  else{
    showLower0 = $('#lowerCM0').is(":checked")
    centerMass0.showLower =  $('#lowerCM0').is(":checked")
  }
}

function changeUpper(id){
  if(id){
    centerMass1.showUpper = $('#upperCM1').is(":checked")
    showUpper1 = $('#upperCM1').is(":checked")
  }
  else{
    showUpper0 = $('#upperCM0').is(":checked")
    centerMass0.showUpper =  $('#upperCM0').is(":checked")
  }
}

/*******************************************************
        END LISTENER FOR DRAWING COMPONENT FUNCTION
*******************************************************/
