$( document ).ready(function() {
  console.log( "ready!" );
  prepareDom()
});

function prepareDom(){
  initCanvas();
  initDomSystem();
  //FIRST DRAW
  drawDom();

}



/*******************************************************
                    START INIT FUNCTION
*******************************************************/

    /*******************************************************
                        START INIT CANVAS FUNCTION
    *******************************************************/
    function initCanvas(){
      initCanvasList(0);
      initCanvasList(1);
      initDrawComponentsUtils();
      initDrawComponents();
      initCanvasMeasure()
    }

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
      function initDrawComponentsUtils(){
        firstMethode = $("#swingType0").val()
        secondMethode = $("#swingType1").val()


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

      function initDrawComponents(){
        rope0 = new Rope(ctx0)
        swing0 = new Swing(ctx0)
        centerMass0 = new CenterMass(ctx0, showUpper0, showLower0)
        body0 = new Body(ctx0, bodyHeight0)

        rope1 = new Rope(ctx1)
        swing1 = new Swing(ctx1)
        centerMass1 = new CenterMass(ctx1, showUpper1, showLower1)
        body1 = new Body(ctx1, bodyHeight1)
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
    /*******************************************************
                        END INIT CANVAS FUNCTION
    *******************************************************/
    /*******************************************************
                        START INIT DOCUMENT FUNCTION
    *******************************************************/
    function initDomSystem(){
      // $("#selectDiv0 :input").change(updateSwingTypeFirst)
      // $("#selectDiv1 :input").change(updateSwingTypeSecond)
      $("#selectDiv0 :input").prop( "disabled", false);
      $("#selectDiv1 :input").prop( "disabled", false);
      controlButtonSystem(0)
      controlButtonSystem(1)

      M.AutoInit();
    }

      function controlButtonSystem(id){
        $("#speedUpParent"+id).addClass("disabled");
        $("#playButton"+id).addClass("disabled");
        $("#speedDownParent"+id).addClass("disabled");
      }
    /*******************************************************
                        END INIT DOCUMENT FUNCTION
    *******************************************************/

    /*******************************************************
                        START INIT DOCUMENT FUNCTION
    *******************************************************/
    function drawDom(){
      initDefVar();
      livePreview();
      initGraph();
      formMode(0)
      formMode(1)
    }

      function initDefVar(){
        oldFirst = "standing"
        oldSecond = "standing"
        initPhi();
        initW();
        initGravity();
        initMass();
        initBodyHeight();
        initRopeLenght();
        initBodyPosition();
      }

      function initGraph(){
        initGraphMeasure()
        timeGraph0 = new Graph(ctxTime0,"Time/Angle graph","phi(rad)","time(s)","radiant angle")
        speedGraph0 = new Graph(ctxSpeed0,"Angular Speed/Angle graph","angular speed(rad/s)","phi(rad)","angular speed")
        timeGraph1 = new Graph(ctxTime1,"Time/Angle graph","phi(rad)","time(s)","radiant angle")
        speedGraph1 = new Graph(ctxSpeed1,"Angular Speed/Angle graph","angular speed(rad/s)","phi(rad)","angular speed")
      }



      function initGraphMeasure(){
        timeGraphCanvas0.height = $("#graphTimeDiv0").height()
        timeGraphCanvas0.width = $("#graphTimeDiv0").width()

        speedGraphCanvas0.height = $("#graphSpeedDiv0").height()
        speedGraphCanvas0.width = $("#graphSpeedDiv0").width()


        timeGraphCanvas1.height = $("#graphTimeDiv1").height()
        timeGraphCanvas1.width = $("#graphTimeDiv1").width()

        speedGraphCanvas1.height = $("#graphSpeedDiv1").height()
        speedGraphCanvas1.width = $("#graphSpeedDiv1").width()
      }
    /*******************************************************
                        END INIT DOCUMENT FUNCTION
    *******************************************************/

/*******************************************************
                    END INIT FUNCTION
*******************************************************/
