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
}



function geneticDraw() {
  while (!stopTraining) {

    // delete failing or successful bodies, store them in a backup array
    for (let i = 0; i <= geneticBodies.length - 1; i++) {

      // if (geneticBodies[i].reachMaxPhi || geneticBodies[i].isImprovingPhi() === false) {
      // if(geneticBodies[i].reachMaxPhi) console.log("dead for MAX Phi reached")
      // else console.log("dead for not improved Phi")
      if (geneticBodies[i].improvedPhi()) {
        console.log("reached bottom");
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


function trainLoop() {
  geneticSetup()
  $("#trainLog").text("Training Generation number: " + genCounter)
  setTimeout(train,300)
}

function train() {
  $("#saveGenetic").addClass("disabled");
  geneticDraw()
}
