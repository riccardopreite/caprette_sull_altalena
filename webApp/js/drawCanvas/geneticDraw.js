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



// =========================================================================================

function setup() {
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
    console.log("genetic")


    geneticCtx.clearRect(0, 0, canvas0.width, canvas0.height)
    ctx0.setTransform(1, 0, 0, 1, 0, 0)

    // show the last frame
    for (let i = 0; i < geneticBodies.length - 1; i++) {
        geneticBodies[i].show()
        ropes[i].show()
        swings[i].show()
    }

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

        // update
        geneticBodies[i].update(nextFrame)
        nextFrame.scaleFrame()
        nextFrame.translateFrame()
        ropes[i].update(nextFrame)
        swings[i].update(nextFrame)
    }
}





function trainLoop() {
    setup()
    // while (setupCompleted && !stopTraining)
    //     setTimeout(geneticDraw,1000)
}

function train() {
    while (!stopTraining)
        geneticDraw()
}