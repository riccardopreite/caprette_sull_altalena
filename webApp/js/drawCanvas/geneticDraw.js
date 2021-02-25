const POPULATION = 25
var stopTraining = false
var setupCompleted = false

// create a frame for the initial conditions
// phi = document.getElementById('phi_selector').value()
// w = document.getElementById('w_selector').value()
// ...
// TUTTE LE VARIABILI DI FRAME DEVONO ESSERE SPECIFICATE
// CM, SWING, LOWER, UPPER, POSITION ECC
// Frame initialCond = new Frame(.......)

// grab proper ctx <===================
var geneticCtx = ctx0
let initialStateFrame = null
let genetictype = null

let geneticBodies = []
let ropes = []
let swings = []
let savedGenticBodies = []
// log vars - stores the best body so far
var currentRecordBody = undefined
var PATIENCE = 5
var trainedList = [],i=0;
while(i < POPULATION){
  trainedList[i] = []
  i++
}
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
    genCounter = 0
    PATIENCE = 5
    setupCompleted = false



    // get initial conditions
    initialStateFrame = getFormValue()
  //1.1 prima  var brainJson = {"input_nodes":3,"hidden_nodes":4,"output_nodes":2,"weights_ih":{"rows":4,"cols":3,"data":[[-0.22981948965992594,-0.8820122671811479,-0.5591393644738845],[0.0836367471076036,0.597382353654988,0.7854260525615695],[0.6072952922305639,0.4307615533955418,-0.3895069932294164],[0.2228878489712689,0.3959451616284748,0.8398632459919599]]},"weights_ho":{"rows":2,"cols":4,"data":[[0.8296672581794056,-0.8503557241759725,-0.9028467227821788,0.20946229019195428],[-0.4151773783557786,-0.41551533909086036,0.9919052214582815,-0.043461746486355146]]},"bias_h":{"rows":4,"cols":1,"data":[[0.18427564488595838],[-0.791383751398465],[0.9768220038875159],[-0.12174616025908236]]},"bias_o":{"rows":2,"cols":1,"data":[[0.31699756341267227],[-0.20455819632988037]]},"learning_rate":0.1,"activation_function":{}};

  //1.3  // var  brainJson = {"input_nodes":3,"hidden_nodes":4,"output_nodes":2,"weights_ih":{"rows":4,"cols":3,"data":[[-0.22981948965992594,-0.8820122671811479,-0.5591393644738845],[0.0836367471076036,0.597382353654988,0.5464117898626344],[0.6072952922305639,0.4307615533955418,-0.3895069932294164],[0.2228878489712689,0.3959451616284748,0.8398632459919599]]},"weights_ho":{"rows":2,"cols":4,"data":[[0.8296672581794056,-0.8503557241759725,-0.9028467227821788,0.20946229019195428],[-0.4151773783557786,-0.41551533909086036,0.9919052214582815,-0.043461746486355146]]},"bias_h":{"rows":4,"cols":1,"data":[[0.18427564488595838],[-0.791383751398465],[0.9768220038875159],[-0.12277338788178227]]},"bias_o":{"rows":2,"cols":1,"data":[[0.31699756341267227],[-0.20455819632988037]]},"learning_rate":0.1,"activation_function":{}}
//1.1 nuova
    var brainJson = {"input_nodes":3,"hidden_nodes":4,"output_nodes":2,"weights_ih":{"rows":4,"cols":3,"data":[[-0.22981948965992594,-0.8820122671811479,-0.5591393644738845],[0.0836367471076036,0.597382353654988,0.7854260525615695],[0.6072952922305639,0.4307615533955418,-0.3895069932294164],[0.2228878489712689,0.3959451616284748,0.8398632459919599]]},"weights_ho":{"rows":2,"cols":4,"data":[[0.8296672581794056,-0.8503557241759725,-0.9028467227821788,0.35700567807224415],[-0.4151773783557786,-0.41551533909086036,0.9919052214582815,-0.043461746486355146]]},"bias_h":{"rows":4,"cols":1,"data":[[0.18427564488595838],[-0.791383751398465],[0.9768220038875159],[-0.12174616025908236]]},"bias_o":{"rows":2,"cols":1,"data":[[0.31699756341267227],[-0.20455819632988037]]},"learning_rate":0.1,"activation_function":{}}

    var brain = deserialize(brainJson)
    console.log(brain);
    console.log(initialStateFrame)
    //LOAD GOOD BRAIN FROM BRAIN.JSON
    // init
    // initialStateFrame.bodyHeight *= 100
    for (let i = 0; i <= POPULATION - 1; i++) {
      geneticBodies[i] = new GeneticBody(geneticCtx, initialStateFrame,brain)
      // geneticBodies[i] = new GeneticBody(geneticCtx, initialStateFrame)
        ropes[i] = new Rope(geneticCtx, initialStateFrame)
        swings[i] = new Swing(geneticCtx, initialStateFrame)
    }

    // DOM reset
    showHideDiv("#geneticDiv", "#graphDiv0")
    showHideDiv("#geneticDiv", "#formDiv0")
    updateRecordsDOM("-", Math.abs(initialStateFrame.phi), "-")
    updatPopulationDOM(geneticBodies.length)
    emptyLogDOM()
    addLogMsgDOM("========================================")
    addLogMsgDOM("GENERATION NUMBER: " + genCounter)
    addLogMsgDOM("========================================")


    setupCompleted = true
}


function geneticDraw() {


    // geneticCtx.clearRect(0, 0, canvas0.width, canvas0.height)

    // show the last frame
    // for (let i = 0; i < geneticBodies.length - 1; i++) {
    //     ropes[i].show()
    //     swings[i].show()
    //     geneticBodies[i].show()
    // }
    // ropes[0].show()
    // swings[0].show()
    // geneticBodies[0].show()
    // geneticCtx.setTransform(1, 0, 0, 1, 0, 0)
    // delete failing or successful bodies, store them in a backup array
    for (let i = 0; i <= geneticBodies.length - 1; i++) {
        if (geneticBodies[i].isImproving() === false || geneticBodies[i].reachMaxPhi) {
            savedGenticBodies.push(geneticBodies.splice(i, 1)[0])
            ropes.splice(i, 1)
            swings.splice(i, 1)
        }
    }

    // Current population update
    updatPopulationDOM(geneticBodies.length)

    // check empty array
    if (geneticBodies.length === 0) {
        nextGeneration()
        return
    }


    // update
    for (let i = 0; i <= geneticBodies.length - 1; i++) {
        // calculate next conditions based on next position choice
        nextPosition = geneticBodies[i].think()
        nextFrame = getNextFrame(geneticBodies[i].currentFrame, nextPosition)
        trainedList[i].push(nextFrame)
        // update
        geneticBodies[i].update(nextFrame)
        let next = nextFrame.clone()
        next.scaleFrame()
        next.translateFrame()
        ropes[i].update(next)
        swings[i].update(next)
    }
}


function goBest(){
  while(Math.abs(geneticBodies[0].currentFrame.phi) < 1.309){
    nextPosition = geneticBodies[0].think()
    nextFrame = getNextFrame(geneticBodies[0].currentFrame, nextPosition)
    trainedList[0].push(nextFrame)
    // update
    geneticBodies[0].update(nextFrame)
    let next = nextFrame.clone()
    next.scaleFrame()
    next.translateFrame()
    ropes[0].update(next)
    swings[0].update(next)
  }
  setTimingSingle(0)
}


function trainLoop() {
    geneticSetup()
    // setTimeout(function(){
    //   train()
    // },100)
    // while (setupCompleted && !stopTraining)
    //     setTimeout(geneticDraw,1000)
}

function train() {
    while (!stopTraining)
      geneticDraw()
        setTiming(0)
}

function setTiming(ind){
  geneticCtx.clearRect(0, 0, canvas0.width, canvas0.height)

  for(var i in trainedList){
    if(ind < trainedList[i].length){
      geneticCtx.save()
      drawingGeneticTrained(trainedList[i][ind],i)
      geneticCtx.restore()
    }
    }

  geneticCtx.setTransform(1, 0, 0, 1, 0, 0)
  ind = ind + 20
  setTimeout(function(){
    setTiming(ind)
  },1)
}

function setTimingSingle(ind){
  geneticCtx.clearRect(0, 0, canvas0.width, canvas0.height)

  // for(var i in trainedList){
    if(ind < trainedList[0].length){
      geneticCtx.save()
      drawingGeneticTrained(trainedList[0][ind],0)
      geneticCtx.restore()
    }
    // }

  geneticCtx.setTransform(1, 0, 0, 1, 0, 0)
  ind = ind + 1
  setTimeout(function(){
    setTimingSingle(ind)
  },5)
}

function drawingGeneticTrained(toDraw,ind){
  geneticBodies[ind].update(toDraw)
  ropes[ind].update(toDraw)
  swings[ind].update(toDraw)
  ropes[ind].show()
  swings[ind].show()
  geneticBodies[ind].show()
}
