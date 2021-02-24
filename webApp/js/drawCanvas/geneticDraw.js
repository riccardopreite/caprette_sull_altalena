const POPULATION = 100
var stopTraining = false

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

    showHideDiv("#geneticDiv","#graphDiv0")
    showHideDiv("#geneticDiv","#formDiv0")
    // get initial conditions
    initialStateFrame = getFormValue()

    // init
    for (let i = 0; i < POPULATION; i++) {
        geneticBodies.push(new GeneticBody(geneticCtx, initialStateFrame))
        ropes.push(new Rope(geneticCtx, initialStateFrame))
        swings.push(new Swing(geneticCtx, initialStateFrame))
    }

    // DOM reset
    updateRecords("-", Math.abs(initialStateFrame.phi), "-")
    emptyLog()
    addLogMsgDOM("========================================")
    addLogMsgDOM("GENERATION NUMBER: " + genCounter)
    addLogMsgDOM("========================================")
}


function geneticDraw() {

    // show the last frame
    console.log("drawing");
    for (let i = 0; i < POPULATION; i++) {
        geneticBodies[i].show()
        ropes[i].show()
        swings[i].show()
    }
    // delete failing or successful bodies, store them in a backup array
    for (let i = 0; i < POPULATION; i++) {
        if (geneticBodies[i].isImproving() === false || geneticBodies[i].reachMaxPhi) {
            savedGenticBodies.push(geneticBodies.splice(i, 1)[0])
            ropes.splice(i, 1)
            swings.splice(i, 1)
        }
    }

    // check empty array
    if (geneticBodies.length === 0) {
        nextGeneration()
    }


    // update
    for (let i = 0; i < POPULATION; i++) {
        // calculate next conditions based on next position choice
        nextPosition = geneticBodies[i].think()
        nextFrame = getNextFrame(geneticBodies[i].currentFrame, nextPosition)

        // update
        geneticBodies[i].update(nextFrame)
        ropes[i].update(nextFrame)
        swings[i].update(nextFrame)
    }
}





function trainLoop() {
    setup()
    while (!stopTraining)
        geneticDraw()
}
