const POPULATION = 50
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

    console.log(initialStateFrame)

    // init
    // initialStateFrame.bodyHeight *= 100
    for (let i = 0; i <= POPULATION - 1; i++) {
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





function trainLoop() {
    geneticSetup()
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
  ind++
  setTimeout(function(){
    setTiming(ind)
  },1)
}

function drawingGeneticTrained(toDraw,ind){
  geneticBodies[ind].update(toDraw)
  ropes[ind].update(toDraw)
  swings[ind].update(toDraw)
  ropes[ind].show()
  swings[ind].show()
  geneticBodies[ind].show()
}
