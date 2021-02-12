$( document ).ready(function() {
  console.log( "ready!" );
  prepareCanvas()
});

function prepareCanvas(){
  initCanvasList(0);
  initCanvasList(1);
  initUpperCM();
  initLowerCM();
  initCanvasMeasure()
  initOnChangeEvent()
  controlButtonSelectSystem(1,false)
  M.AutoInit();
  //FIRST DRAW
  firstDrawBodies()

  /*************************
  THIS CODE COMMENTED IS NOT WORKING FOR SECOND CANVAS
  *************************/
  // var canvasContainer = document.getElementsByClassName('card-image');
  // var cs0 = getComputedStyle(canvasContainer[0]);
  // var cs1 = getComputedStyle(canvasContainer[1]);
  //
  // /// these will return dimensions in *pixel* regardless of what
  // /// you originally specified for image:
  // var width = parseInt(cs0.getPropertyValue('width'), 10);
  // var height = parseInt(cs0.getPropertyValue('height'), 10);
  //
  // canvas0.width = width;
  // canvas0.height = height;
  // width = parseInt(cs1.getPropertyValue('width'), 10);
  // height = parseInt(cs1.getPropertyValue('height'), 10);
  // canvas1.width = width;
  // canvas1.height = height;
}



/*******************************************************
                    START INIT FUNCTION
*******************************************************/

function initCanvasList(id){

  /*************************
    INIT CANVAS LIST
  *************************/

  canvasList[id] = {};
  canvasList[id]["standing_frameList"]= [];
  canvasList[id]["seated_frameList"]= [];
  canvasList[id]["realistic_frameList"]= [];
  canvasList[id]["combined_frameList"]= [];
}

function initUpperCM(){

  /*************************
    INIT UPPERCM NEEDED FOR DRAWING COMPONENTS OBJECT
  *************************/

  showUpper0 = $('#upperCM0').is(":checked")
  showUpper1 = $('#upperCM1').is(":checked")
}

function initLowerCM(){

  /*************************
    INIT LOWERCM NEEDED FOR DRAWING COMPONENTS OBJECT
  *************************/

  showLower0 = $('#lowerCM0').is(":checked")
  showLower1 = $('#lowerCM1').is(":checked")
  bodyHeight0 = 160
  bodyHeight1 = 160
}

function initCanvasMeasure(){

  /*************************
    INIT CANVAS MEASURE
  *************************/

  ctx0.canvas.height = $("#parentCanvas0").height()
  ctx0.canvas.width = $("#parentCanvas0").width()
  ctx1.canvas.height = $("#parentCanvas1").height()
  ctx1.canvas.width = $("#parentCanvas1").width()
}

function initOnChangeEvent(){
  $("#selectDiv0 :input").change(updateSwingTypeFirst)
  $("#selectDiv1 :input").change(updateSwingTypeSecond)
}

function firstDrawBodies(){
  rope0 = new Rope(ctx0)
  swing0 = new Swing(ctx0)
  centerMass0 = new CenterMass(ctx0, showUpper0, showLower0)
  body0 = new Body(ctx0, bodyHeight0)

  rope1 = new Rope(ctx1)
  swing1 = new Swing(ctx1)
  centerMass1 = new CenterMass(ctx1, showUpper1, showLower1)
  body1 = new Body(ctx1, bodyHeight1)

  /*
  IMPORTANT: always put swing BEFORE body show.
  Body coordinates (and rotations) are calculated based on the Swing
   */
  rope0.show()
  swing0.show()
  centerMass0.show()
  body0.show()

  rope1.show()
  swing1.show()
  centerMass1.show()
  body1.show()
}

/*******************************************************
                    END INIT FUNCTION
*******************************************************/
