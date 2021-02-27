/**
 * - Calculate fitness values for each body
 * - Repopulation
 *      - pick the body with the highest fitness value
 *      - mutate it by MUTATION_RATE percentage
 *      - repopulate bodies starting from best one + mutations
 *      - recreate swings and ropes obj
 * - empty backup array
 * - update genCounter
 */
function nextGeneration() {
    console.log("nextGen")

    // calculate fitness
    calculateFitness()

    // repopulation
    for (let i = 0; i <= POPULATION-1; i++) {
        geneticBodies[i] = pickBest(!i)
        ropes[i] = new Rope(geneticCtx, initialStateFrame)
        swings[i] = new Swing(geneticCtx, initialStateFrame)
    }

    addLogMsgDOM("Repopulation ...")
    addLogMsgDOM("Mutation ...")

    // empty backup array
    savedGenticBodies = []

    genCounter++

    // DOM handling
    addLogMsgDOM("========================================")
    addLogMsgDOM("GENERATION NUMBER: " + genCounter)
    addLogMsgDOM("========================================")
}

/**
 * - From backup array choose the one element with highest fitness value
 * - Log its data (score - fitness - jumps)
 * - copy it in a new Genetic Body
 * - mutate new genetic body
 * @returns {GeneticBody} newBody: mutated genetic Body
 */
function pickBest(log) {
    // pick the best
    // var index = 0
    // var r = Math.random(1)
    // while (r > 0) {
    //     r = r - savedGenticBodies[index].fitness
    //     index++
    // }
    // index--
    var index = 0
    var maxFitness = 0

    for(let i=0; i<= savedGenticBodies.length-1; i++){
        if(savedGenticBodies[i].fitness > maxFitness){
            maxFitness = savedGenticBodies[i].fitness
            index = i
        }
    }
    let best = savedGenticBodies[index]

    // log only the first time
    if (log) {
        if (currentRecordBody === undefined || best.score > currentRecordBody.score) {
            patience = PATIENCE_MAX
            currentRecordBody = best
            updateRecordsDOM(
                best.score,
                best.max_phi,
                best.jumps.length
            )
        }

        // stop training if score no longer improves
        if (best.score <= currentRecordBody.score)
            patience--
        if (patience == 0) {
            stopTraining = true
            console.log(currentRecordBody)
        }


        addLogMsgDOM(best.log())
    }


    // creation and mutation
    let newBody = new GeneticBody(geneticCtx, initialStateFrame, best.brain)
    newBody.mutate()

    return newBody
}

function calculateFitness() {
    let sum = 0
    // total score
    savedGenticBodies.forEach(e => {
        sum += e.score
    })

    // normalize fitness value between 0 and 1
    savedGenticBodies.forEach(e => {
        e.fitness += e.score / sum
    })
}
