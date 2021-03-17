const POPULATION = 500
var stopTraining = false

// grab proper ctx <===================
var geneticCtx = ctx0
let initialStateFrame = null
let genetictype = null

let geneticBodies = []
let savedGenticBodies = []
// log vars - stores the best body so far
var currentRecordBody = undefined
var tmpRecord = undefined

var showingList = [],showingIndex = 0,graphOffset = 0;
const FRAME_GRAPH_OFFEST = 100;

const PATIENCE_MAX = 100
var patience = PATIENCE_MAX

const MAX_PHI_COUNTER = POPULATION / 50
var MaxPhiCounter = MAX_PHI_COUNTER

var genNumber = 0;
var nextGen = true;
var geneticInterval = undefined;


var GENERATION_TIMEOUT = 1
const STEPS = 15
var draw = false;



var brainTrained = null //deserialize(brainJson)

function deserialize(data) {
  if (typeof data == 'string') {
    data = JSON.parse(data);
  }
  let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
  nn.weights_ih = Matrix.deserialize(data.weights_ih);
  nn.weights_ho = Matrix.deserialize(data.weights_ho);
  nn.bias_h = Matrix.deserialize(data.bias_h);
  nn.bias_o = Matrix.deserialize(data.bias_o);
  nn.learning_rate = data.learning_rate;
  return nn;
}
// =========================================================================================


function geneticSetup() {

  // reset
  stopTraining = false
  geneticBodies = []
  ropes = []
  swings = []
  savedGenticBodies = []
  currentRecordBody = undefined
  currentRecordBodyArray = []
  genCounter = 0
  iterationCounter = 0
  patience = PATIENCE_MAX
  MaxPhiCounter = MAX_PHI_COUNTER

  // get initial conditions
  initialStateFrame = getFormValue()

  // init
  if(brainTrained != null){
    console.log("brain uploaded");
  }
  for (let i = 0; i <= POPULATION - 1; i++) {
    if(brainTrained != null){
      geneticBodies[i] = new GeneticBody(geneticCtx, initialStateFrame,brainTrained)
      geneticBodies[i].mutate()
    }
    else
    geneticBodies[i] = new GeneticBody(geneticCtx, initialStateFrame)
  }
  // DOM reset

  showHideDiv("#graphDiv0", "#formDiv0")
  showHideDiv("#scoreContainer", "#formInputFiledContainer")
  showHideDiv("#popLog","#formInputFiledContainer")
  showHideDiv("#geneticControlButton", "#swingControlButton")
  updateRecordsDOM("-", Math.abs(initialStateFrame.phi), "-",patience)
  updatPopulationDOM(geneticBodies.length)
  emptyLogDOM()
  addLogMsgDOM("========================================")
  addLogMsgDOM("GENERATION NUMBER: " + genCounter)
  addLogMsgDOM("========================================")
}



function geneticDraw() {
  while (!stopTraining) {

    // delete failing or successful bodies, store them in a backup array
    for (let i = 0; i <= geneticBodies.length - 1; i++) {

      // if (geneticBodies[i].reachMaxPhi || geneticBodies[i].isImprovingPhi() === false) {
      // if(geneticBodies[i].reachMaxPhi) console.log("dead for MAX Phi reached")
      // else console.log("dead for not improved Phi")
      if (geneticBodies[i].improvedPhi()) {
        console.log("Stop Training");
        savedGenticBodies.push(geneticBodies[i])
        geneticBodies.splice(i, 1)
        i--;
      }
    }

    // check empty array
    if (geneticBodies.length === 0) {
      nextGeneration()
      stopTraining = true
      drawRecordBody()
      // return
    }


    // update
    for (let i = 0; i <= geneticBodies.length - 1; i++) {
      // calculate next conditions based on next position choice
      nextPosition = geneticBodies[i].think()
      nextFrame = getNextFrame(geneticBodies[i].currentFrame, nextPosition, geneticBodies[i])
      geneticBodies[i].update(nextFrame)
    }
  }
}


function drawRecordBody() {
  console.log("draw record");
  showingList = goBest(tmpRecord.brain)
  graphOffset = parseInt(showingList.length/FRAME_GRAPH_OFFEST)

  showingIndex = 0
  draw=true
  timeGraph0.resetChart()
  speedGraph0.resetChart()
  timeGraph0 = new Graph(ctxTime0,"Time/Angle graph","phi(rad)","time(s)","radiant angle")
  speedGraph0 = new Graph(ctxSpeed0,"Angular Speed/Angle graph","angular speed(rad/s)","phi(rad)","angular speed")
  if(patience != 50){
    showingList = []
  }
  if (patience == 0) {
      stopTraining = true
      draw = false
      $("#trainLog").text("")
      compareSwingDraw()
  }
  else drawBest()
}

function trainLoop() {
  geneticSetup()
  $("#trainLog").text("Training Generation number: " + genCounter)
  setTimeout(train,300)
}

function train() {
  $("#saveGenetic").addClass("disabled");
  geneticDraw()
}



function drawBest() {
  if(showingList.length == 0){
    if (patience) stopTraining = false;
    else{
      $("#saveGenetic").removeClass("disabled");
    }

    //add graph of score while training generation

    setTimeout(train,1000)
  }
  else if(draw){
    let initFrame = showingList[0]
    var tmpBody = new GeneticBody(geneticCtx, initFrame)
    var tmpRope = new Rope(geneticCtx, initFrame)
    var tmpSwing = new Swing(geneticCtx, initFrame)
    if (showingIndex < showingList.length) {
      let counter = 0
      while(counter < 5){
        if (showingIndex >= showingList.length) break;
        let frame = showingList[showingIndex]
        //ADD GRAPH
        geneticCtx.clearRect(0, 0, canvas0.width, canvas0.height)
        tmpBody.update(frame)
        tmpRope.update(frame)
        tmpSwing.update(frame)

        //show frame
        tmpRope.show()
        tmpSwing.show()
        tmpBody.show()
        geneticCtx.setTransform(1, 0, 0, 1, 0, 0)
        if( (!(showingIndex % graphOffset)) || (showingIndex == (showingList.length-1)) ){
          timeGraph0.addScatterPoint(frame.t.toFixed(3), frame.phi.toFixed(3))
          speedGraph0.addScatterPoint(frame.phi.toFixed(3), frame.w.toFixed(3))
        }
        showingIndex = showingIndex + 1
        counter++
      }

      setTimeout(drawBest,GENERATION_TIMEOUT)
    } else {
      if (patience) stopTraining = false;
      else{
        $("#saveGenetic").removeClass("disabled");
      }
      //refresh generation in score log with actual generation and print only training....

      $("#trainLog").text("Training Generation number: " + genNumber)
      //add graph of score while training generation

      setTimeout(train,300)
    }
  }
}


function goBest(brain) {
  var tmpBody = new GeneticBody(geneticCtx, initialStateFrame, brain)
  var tmpRope = new Rope(geneticCtx, initialStateFrame)
  var tmpSwing = new Swing(geneticCtx, initialStateFrame)
  let trainedFrame = [],
    timer = 0;
  while (timer < STEPS && Math.abs(tmpBody.currentFrame.phi) < 1.309) {
    nextPosition = tmpBody.think()
    nextFrame = getNextFrame(tmpBody.currentFrame, nextPosition,tmpBody)
    tmpBody.update(nextFrame)

    let next = nextFrame.clone()
    next.scaleFrame()
    next.translateFrame()

    tmpRope.update(next)
    tmpSwing.update(next)

    trainedFrame.push(nextFrame)
    // update
    timer += 0.001
  }
  return trainedFrame;
}
