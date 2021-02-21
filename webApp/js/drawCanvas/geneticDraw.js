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
// log vars
var genCounter = 0
var maxPhi_counter = 0
var jumps_counter = 0



// =========================================================================================

function setup() {
    // reset
    stopTraining = false
    geneticBodies = []
    ropes = []
    swings = []
    savedGenticBodies = []
    genCounter = 0

    // get initial conditions
    initialStateFrame = getValueFrom()
    maxPhi_counter = Math.abs(initialStateFrame.phi)
    jumps_counter = 0
    
    // init
    for (let i = 0; i < POPULATION; i++) {
        geneticBodies.push(new GeneticBody(geneticCtx, initialStateFrame))
        ropes.push(new Rope(geneticCtx, initialStateFrame))
        swings.push(new Swing(geneticCtx, initialStateFrame))
    }
}


function geneticDraw() {
    // DOM handling
    addLogMsgDOM("========================================\n")
    addLogMsgDOM("GENERATION NUMBER: " + genCounter + "\n")
    addLogMsgDOM("========================================\n\n")
    

    // show the last frame
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




    //THINK PHASE
    /**
     * foreach body
     *      body.think -----> my next position will be "standing"
     *      nextMove.push(body.currentPostion(body.nextPosition))
     */

    // UPDATE PHASE
    /**
     * foreach obj
     *      body[i].update(nextMove[i])
     *      rope...
     *      swing...
     */





}





function trainLoop() {
    setup()
    while (!stopTraining)
        geneticDraw()
}