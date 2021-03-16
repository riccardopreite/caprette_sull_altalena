const N_PARENTS = 10
const TOURNAMENT_SIZE = 0.3
const MUTATION_PROBABILITY = 0.1
var avgScoreArr = []

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

    calculateFitness()

    // get element with the highest fitness value
    var best = getMaxFitnessElement(savedGenticBodies)
    // update recordBody, log, patience
    updateRecordBody(best)

    // selection, avg score
    var parents = tournamentSelection(N_PARENTS)
    avgScoreArr.push(avgScore(parents))

    // repopulate
    addLogMsgDOM("Repopulation ...")
    addLogMsgDOM("Mutation ...")
    // 1-clone ?????????????????? Copy <============
    parents.forEach(p => {
        geneticBodies.push(new GeneticBody(geneticCtx, initialStateFrame, p.brain))
    })
    // 2-crossOver + mutation
    var children = crossOver(parents)
    children.forEach(c => {
        geneticBodies.push(new GeneticBody(geneticCtx, initialStateFrame, c))
    })


    // empty backup array
    savedGenticBodies = []
    genCounter++

    // DOM handling
    addLogMsgDOM("========================================")
    addLogMsgDOM("GENERATION NUMBER: " + genCounter)
    addLogMsgDOM("========================================")
}

/** Fitness ===================================================================================================================== */

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

/**
 *
 * @param {Array GeneticBodyes} pop
 * @returns score average
 */
function avgScore(pop) {
    var sum = 0
    pop.forEach(p => {
        sum += p.score
    })
    return sum / pop.length
}

/**
 *
 * @param {Array GeneticBody} pop
 * @returns {GeneticBody} the element with highest fitness value
 */
function getMaxFitnessElement(pop) {
    return pop.reduce(function (prev, next) {
        return (prev.fitness > next.fitness ? prev : next);
    })
}


/**
 *
 * @param {GeneticBody} best: the element with the highest fitness for the current generation
 * If its fitness is > than currentRecord => currentRecord is updated
 * Otherwise patience is decreased, until reachs 0
 */
function updateRecordBody(best) {
    if (currentRecordBody === undefined || best.score > currentRecordBody.score) {
        patience = PATIENCE_MAX
        currentRecordBody = best
        // currentRecordBodyArray.push(best)
        updateRecordsDOM(
            currentRecordBody.score,
            currentRecordBody.max_phi,
            currentRecordBody.jumps.length,
            patience
        )
    } else {
        patience--
        $("#patienceCounter").text(patience)
    }

    if (patience == 0) {
        stopTraining = true
        console.log(currentRecordBody)
    }
}



/** Selection ===================================================================================================================== */
/**
 *
 * @param {int} n_parents: determines how many parents must return from selection
 * @returns {Array GeneticBody} parents: selected elements
 */
function tournamentSelection(n_parents) {
    var parents = []
    var parentsIndex = []
    var tournament = []
    var winner, tmpIndex

    for (var i = 0; i < n_parents; i++) {
        // reset
        tournament = []
        parentsIndex = []
        winner = undefined

        // pick TORNAMENT_SIZE elements (dinstic)
        while (tournament.length < (POPULATION * TOURNAMENT_SIZE)) {
            tmpIndex = randomBetween(0, savedGenticBodies.length)
            if (parentsIndex.includes(tmpIndex) === false) {
                parentsIndex.push(tmpIndex)
                tournament.push(savedGenticBodies[tmpIndex])
            }
        }

        // pick the highest fitness among tournament
        winner = getMaxFitnessElement(tournament)
        parents.push(winner)

        savedGenticBodies.splice(savedGenticBodies.indexOf(winner), 1)
    }
    return parents
}


/** Crossover ===================================================================================================================== */

/**
 *
 * @param {Array GeneticBody} parents
 * @returns {Array geneticBodies}
 */
function crossOver(parents) {
    var children = []
    var p1, p2
    var i, j

    while (children.length < POPULATION - parents.length) {
        // pick 2 dinstic parents
        i = randomBetween(0, parents.length - 1)
        j = randomBetween(0, parents.length - 1)
        while (i == j) j = randomBetween(0, parents.length - 1)
        p1 = parents[i].brain
        p2 = parents[j].brain

        // get 2 children from crossOver
        offSprings = crossOver_couple(p1, p2)

        // mutation
        if (Math.random() < MUTATION_PROBABILITY)
            offSprings[0].mutate(MUTATION_RATE)
        if (Math.random() < MUTATION_PROBABILITY)
            offSprings[1].mutate(MUTATION_RATE)


        children.push(offSprings[0])
        children.push(offSprings[1])
    }

    return children
}

/** CHECK <================================================================================================
 *
 * @param {NeuralNetwork} p1: parent1
 * @param {NeuralNetwork} p2: parent2
 * @returns {Array NeuralNetwork}
 */
function crossOver_couple(p1, p2) {
    // get weights from both nn
    var w1 = undefined
    var w2 = undefined

    // crossover weights - return sets of weights
    var offSpring = midPoint2_crossOver(w1, w2)

    // split Matrix into ih, ho
    var m, w_ih, w_ho
    var nn
    var children = []
    offSpring.forEach(weightSet => {
        m = getWeightMatrix(weightSet, p1.input_nodes, p1.hidden_nodes, p1.output_nodes)
        w_ih = m[0]
        w_ho = m[1]

        nn = new NeuralNetwork(p1.input_nodes, p1.hidden_nodes, p1.output_nodes)
        nn.weights_ih = w_ih
        nn.weights_ho = w_ho

        children.push(new GeneticBody(geneticCtx, initialStateFrame, nn))
    })
    return children
}


function midPoint2_crossOver(w1, w2){
    var c1 = []
    var c2 = []
    var w1Len = w1.length
    var w2Len = w2.length

    var c1Point1 = randomBetween(0,Math.floor(w1Len/2))
    var c1Point2 = randomBetween(c1Point1+1,w1Len-1)

    var c2Point1 = randomBetween(0,Math.floor(w2Len/2))
    var c2Point2 = randomBetween(c2Point1+1,w2Len-1)

    for(i=0; i<w1.length; i++){
      /* FIRST CHILDREN CROSSED */
        //first point
        if(i <= c1Point1) c1[i] = w1[i]
        //central point
        else if( (i > c1Point1) &&  (i <= c1Point2)) c1[i] = w2[i]
        //last point
        else c1[i] = w1[i]

      /* SECOND CHILDREN CROSSED */
        if(i <= c2Point1) c2[i] = w2[i]
        //central point
        else if( (i > c2Point1) &&  (i <= c2Point2)) c2[i] = w1[i]
        //last point
        else c2[i] = w2[i]
    }

    return [c1,c2]
}





/** Utils ========================================================================================================================= */

function randomBetween(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
