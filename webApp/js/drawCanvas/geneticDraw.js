const POPULATION = 50
var stopTraining = false

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
var currentRecordBodyArray = []
const PATIENCE_MAX = 5
var patience = PATIENCE_MAX
var genNumber = 0;
var trainedList = [], i=0, nextGen = true;
var geneticInterval = undefined;




//1.1 prima  var brainJson = {"input_nodes":3,"hidden_nodes":4,"output_nodes":2,"weights_ih":{"rows":4,"cols":3,"data":[[-0.22981948965992594,-0.8820122671811479,-0.5591393644738845],[0.0836367471076036,0.597382353654988,0.7854260525615695],[0.6072952922305639,0.4307615533955418,-0.3895069932294164],[0.2228878489712689,0.3959451616284748,0.8398632459919599]]},"weights_ho":{"rows":2,"cols":4,"data":[[0.8296672581794056,-0.8503557241759725,-0.9028467227821788,0.20946229019195428],[-0.4151773783557786,-0.41551533909086036,0.9919052214582815,-0.043461746486355146]]},"bias_h":{"rows":4,"cols":1,"data":[[0.18427564488595838],[-0.791383751398465],[0.9768220038875159],[-0.12174616025908236]]},"bias_o":{"rows":2,"cols":1,"data":[[0.31699756341267227],[-0.20455819632988037]]},"learning_rate":0.1,"activation_function":{}};
//1.4  // var  brainJson = {"input_nodes":3,"hidden_nodes":4,"output_nodes":2,"weights_ih":{"rows":4,"cols":3,"data":[[-0.6768514661777769,0.5840043935269947,0.7753924203017224],[-0.11503058078234885,-0.8085555842907755,0.7554277269737542],[0.20273524419737754,0.6557988923001994,0.17334339931002996],[0.23663572503485675,-0.41573507875043436,-0.0632303623301862]]},"weights_ho":{"rows":2,"cols":4,"data":[[-0.3792141803247904,0.16421310379898024,-0.4644084880158972,-0.0675197478220757],[-0.810664374461342,0.47588415775077,0.8555465427607079,-0.797140370868386]]},"bias_h":{"rows":4,"cols":1,"data":[[-0.5819118263290148],[-0.7128147923374972],[-0.7268343777395447],[-0.32006194164665835]]},"bias_o":{"rows":2,"cols":1,"data":[[0.6369605034379782],[0.6443216915114918]]},"learning_rate":0.1,"activation_function":{}}
//1.1 nuova
var brainJson = {"input_nodes":3,"hidden_nodes":4,"output_nodes":2,"weights_ih":{"rows":4,"cols":3,"data":[[-0.22981948965992594,-0.8820122671811479,-0.5591393644738845],[0.0836367471076036,0.597382353654988,0.7854260525615695],[0.6072952922305639,0.4307615533955418,-0.3895069932294164],[0.2228878489712689,0.3959451616284748,0.8398632459919599]]},"weights_ho":{"rows":2,"cols":4,"data":[[0.8296672581794056,-0.8503557241759725,-0.9028467227821788,0.35700567807224415],[-0.4151773783557786,-0.41551533909086036,0.9919052214582815,-0.043461746486355146]]},"bias_h":{"rows":4,"cols":1,"data":[[0.18427564488595838],[-0.791383751398465],[0.9768220038875159],[-0.12174616025908236]]},"bias_o":{"rows":2,"cols":1,"data":[[0.31699756341267227],[-0.20455819632988037]]},"learning_rate":0.1,"activation_function":{}}
var brainTrained = deserialize(brainJson)




trainedList[0] = []

while(i < POPULATION){
  trainedList[0][i] = []
  i++
}
// i = 0
// while(i < POPULATION){
//   trainedList[i][0] = []
//   i++
// }
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
    patience = PATIENCE_MAX

    // get initial conditions
    initialStateFrame = getFormValue()

    //LOAD GOOD BRAIN FROM BRAIN.JSON
    // init
    // initialStateFrame.bodyHeight *= 100
    for (let i = 0; i <= POPULATION - 1; i++) {
      // geneticBodies[i] = new GeneticBody(geneticCtx, initialStateFrame,brain)
        geneticBodies[i] = new GeneticBody(geneticCtx, initialStateFrame)
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
}


function geneticDraw() {
  // if(stopTraining) {
  //   clearInterval(geneticInterval)
  //   console.log("FINE");
  //   // drawRecordBody()
  //   // setTiming(trainedList,0,0)
  // } else {
  while(!stopTraining){
    // delete failing or successful bodies, store them in a backup array
    for (let i = 0; i <= geneticBodies.length - 1; i++) {
        if (geneticBodies[i].isImproving() === false || geneticBodies[i].reachMaxPhi) {
            console.log("dead")
            // savedGenticBodies.push(geneticBodies.splice(i, 1)[0])
            savedGenticBodies.push(geneticBodies[i])
            geneticBodies.splice(i, 1)
            ropes.splice(i, 1)
            swings.splice(i, 1)
        }
    }

    // Current population update
    updatPopulationDOM(geneticBodies.length)

    // check empty array
    if (geneticBodies.length === 0) {
        nextGeneration()
        stopTraining = true
        drawRecordBody()
        // return
        genNumber++;
    }


    // update
    for (let i = 0; i <= geneticBodies.length - 1; i++) {
        // calculate next conditions based on next position choice
        nextPosition = geneticBodies[i].think()
        nextFrame = getNextFrame(geneticBodies[i].currentFrame, nextPosition)

        // update
        geneticBodies[i].update(nextFrame)
        let next = nextFrame.clone()
        next.scaleFrame()
        next.translateFrame()
        ropes[i].update(next)
        swings[i].update(next)
    }
  }

}

function drawRecordBody(){
  console.log("draw record");
  let showingList = goBest(currentRecordBodyArray[currentRecordBodyArray.length-1].brain)
    console.log(showingList);
    drawBest(showingList,0)
}

function drawBest(showingList,ind){
  let initFrame = showingList[0]
  var tmpBody = new GeneticBody(geneticCtx, initFrame)
  var tmpRope = new Rope(geneticCtx, initFrame)
  var tmpSwing = new Swing(geneticCtx, initFrame)
  if(ind < showingList.length){
    let frame = showingList[ind]

    geneticCtx.clearRect(0, 0, canvas0.width, canvas0.height)
    tmpBody.update(frame)
    tmpRope.update(frame)
    tmpSwing.update(frame)

    //show frame
    tmpRope.show()
    tmpSwing.show()
    tmpBody.show()
    geneticCtx.setTransform(1, 0, 0, 1, 0, 0)
    ind = ind + 10
    setTimeout(function(){
      drawBest(showingList,ind)
    },1)
  }
  else{
    console.log("patience");
    console.log(patience);
    if(patience) stopTraining = false;
    geneticDraw()
  }

}

function goBest(brain){
  var tmpBody = new GeneticBody(geneticCtx, initialStateFrame,brain)
  var tmpRope = new Rope(geneticCtx, initialStateFrame)
  var tmpSwing = new Swing(geneticCtx, initialStateFrame)
  let trainedFrame = [], timer = 0;
  while(timer < 30){
    nextPosition = tmpBody.think()
    nextFrame = getNextFrame(tmpBody.currentFrame, nextPosition)
    tmpBody.update(nextFrame)

    let next = nextFrame.clone()
    next.scaleFrame()
    next.translateFrame()

    tmpRope.update(next)
    tmpSwing.update(next)

    trainedFrame.push(nextFrame)
    // update
    timer+= 0.001
  }
  return trainedFrame;
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
  geneticInterval = setInterval(geneticDraw,1)
    // while (!stopTraining)
    //   geneticDraw()
}

function setTiming(generationList,gen,ind){
  geneticCtx.clearRect(0, 0, canvas0.width, canvas0.height)
  let count = 1;
    for(var boy in generationList[gen]){
      if(ind < generationList[gen][boy].length){
        geneticCtx.save()
        drawingGeneticTrained(generationList[gen][boy][ind],boy)
        geneticCtx.restore()
      }
      else{
        for(var boy in generationList[gen]){
          if(ind < generationList[gen][boy].length){
            count++
          }
        }
      }
    }

  geneticCtx.setTransform(1, 0, 0, 1, 0, 0)
  ind = ind + 10
  setTimeout(function(){
    if (count == generationList[gen].length) {
      gen++
      ind = 0
    }
    setTiming(generationList,gen,ind)
  },5)
}

function setTimingSingle(gen,ind){
  geneticCtx.clearRect(0, 0, canvas0.width, canvas0.height)

  // for(var i in trainedList){
    if(ind < trainedList[0][gen].length){
      geneticCtx.save()
      drawingGeneticTrained(trainedList[0][gen][ind],0)
      geneticCtx.restore()
    }
    else {
      ind = 0
      gen++
    }
    // }

  geneticCtx.setTransform(1, 0, 0, 1, 0, 0)
  ind = ind + 1
  setTimeout(function(){
    setTimingSingle(gen,ind)
  },5)
}

function drawingGeneticTrained(boy,rope,swing,toDraw,ind){
  geneticBodies[ind].update(toDraw)
  ropes[ind].update(toDraw)
  swings[ind].update(toDraw)
  ropes[ind].show()
  swings[ind].show()
  geneticBodies[ind].show()
}
