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
  // var parents = probabilisticSelection(N_PARENTS)
  avgScoreArr.push(avgScore(parents))

  // 1-clone 
  parents.forEach(p => {
    let brain = p.brain.copy()
    geneticBodies.push(new GeneticBody(geneticCtx, initialStateFrame, brain))
  })
  // 2-crossOver + mutation
  var children = crossOver(parents)

  children.forEach(childBrain => {
    // mutation
    if (Math.random() < MUTATION_PROBABILITY)
      childBrain.mutate(MUTATION_RATE)

    geneticBodies.push(new GeneticBody(geneticCtx, initialStateFrame, childBrain))

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
  tmpRecord = best

  if (currentRecordBody === undefined || best.score > currentRecordBody.score) {
    patience = PATIENCE_MAX
    currentRecordBody = best
    updateRecordsDOM(
      currentRecordBody.score,
      currentRecordBody.prevPhi,
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

  drawRecordBody()
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
      tmpIndex = randomBetween(0, savedGenticBodies.length - 1)
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

    children.push(offSprings[0])
    children.push(offSprings[1])
  }
  return children
}

/** 
 * @param {NeuralNetwork} p1: parent1
 * @param {NeuralNetwork} p2: parent2
 * @returns {Array NeuralNetwork}
 */
function crossOver_couple(p1, p2) {
  // get weights from both nn
  var w1 = [],
    w2 = []
  w1 = w1.concat(p1.weights_ih.toArray(), p1.weights_ho.toArray())
  w2 = w2.concat(p2.weights_ih.toArray(), p2.weights_ho.toArray())

  var b1 = [],
    b2 = []
  b1 = b1.concat(p1.bias_h.toArray(), p1.bias_o.toArray())
  b2 = b2.concat(p2.bias_h.toArray(), p2.bias_o.toArray())

  // crossover weights - return sets of weights
  var weightOffSpring, biasOffSpring
  // weightOffSpring = midPoint2_crossOver(w1, w2)
  // biasOffSpring = midPoint3_crossOver(b1, b2)
  // weightOffSpring = midPoint3_crossOver(w1, w2)
  // biasOffSpring = midPoint3_crossOver(b1, b2)
  const ALPHA = 0.7
  weightOffSpring = wholeAritchmetic_crossOver(w1, w2, ALPHA)
  biasOffSpring = wholeAritchmetic_crossOver(b1, b2, ALPHA)

  // split Matrix into ih, ho
  var mw, mb
  var nn
  var children = []
  weightOffSpring.forEach((weightSet, index) => {
    mw = toWeightMatrix(weightOffSpring[index], p1.input_nodes, p1.hidden_nodes, p1.output_nodes)
    mb = toBiasMatrix(biasOffSpring[index], p1.hidden_nodes, p1.output_nodes)

    nn = new NeuralNetwork(p1.input_nodes, p1.hidden_nodes, p1.output_nodes)
    nn.weights_ih = mw[0]
    nn.weights_ho = mw[1]
    nn.bias_h = mb[0]
    nn.bias_o = mb[1]

    children.push(nn)
  })
  return children
}


function midPoint3_crossOver(w1, w2) {
  var c1 = []
  var c2 = []
  var w1Len = w1.length
  var w2Len = w2.length

  var c1Point1 = randomBetween(0, Math.floor(w1Len / 2))
  var c1Point2 = randomBetween(c1Point1 + 1, w1Len - 1)
  var c2Point1 = randomBetween(0, Math.floor(w2Len / 2))
  var c2Point2 = randomBetween(c2Point1 + 1, w2Len - 1)

  for (i = 0; i < w1.length; i++) {
    if (i <= c1Point1) c1[i] = w1[i]
    else if ((i > c1Point1) && (i <= c1Point2)) c1[i] = w2[i]
    else c1[i] = w1[i]

    if (i <= c2Point1) c2[i] = w2[i]
    else if ((i > c2Point1) && (i <= c2Point2)) c2[i] = w1[i]
    else c2[i] = w2[i]
  }

  return [c1, c2]
}

function midPoint2_crossOver(w1, w2) {
  var c1 = []
  var c2 = []
  var midpoint1 = randomBetween(0, w1.length - 1)
  var midpoint2 = randomBetween(0, w1.length - 1)

  for (i = 0; i < w1.length; i++) {
    if (i < midpoint1) c1[i] = w1[i]
    else c1[i] = w2[i]
  }
  for (i = 0; i < w1.length; i++) {
    if (i < midpoint2) c2[i] = w2[i]
    else c2[i] = w1[i]
  }

  return [c1, c2]
}

function wholeAritchmetic_crossOver(w1, w2, alpha) {
  var c1 = []
  var c2 = []

  for (i = 0; i < w1.length; i++) {
    c1[i] = alpha * w1[i] + (1 - alpha) * w2[i]
    c2[i] = alpha * w2[i] + (1 - alpha) * w1[i]
  }

  return [c1, c2]
}




/** Utils ========================================================================================================================= */

function randomBetween(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function toWeightMatrix(arr, n_input, n_hidden, n_output) {
  let splitMatrix1, splitMatrix2, matrix1, matrix2

  matrix1 = new Matrix(n_hidden, n_input);
  matrix2 = new Matrix(n_output, n_hidden);

  splitMatrix1 = n_hidden * n_input
  splitMatrix2 = splitMatrix1 + n_output * n_hidden

  //SPLIT ARR INTO TO 2 ORIGINAL INDEPENDENT WEIGHT VECTOR
  let arr1 = arr.slice(0, splitMatrix1)
  let arr2 = arr.slice(splitMatrix1, splitMatrix2)

  for (let i = 0; i < n_hidden; i++) {
    for (let j = 0; j < n_input; j++) {
      matrix1.data[i][j] = arr1[i];
    }
  }

  for (let i = 0; i < n_output; i++) {
    for (let j = 0; j < n_hidden; j++) {
      matrix2.data[i][j] = arr2[i];
    }
  }

  return [matrix1, matrix2];
}

function toBiasMatrix(arr, n_hidden, n_output) {
  let splitMatrix1, splitMatrix2, matrix1, matrix2

  matrix1 = new Matrix(n_hidden, 1);
  matrix2 = new Matrix(n_output, 1);

  splitMatrix1 = n_hidden * 1
  splitMatrix2 = splitMatrix1 + n_output * 1

  //SPLIT ARR INTO TO 2 ORIGINAL INDEPENDENT WEIGHT VECTOR
  let arr1 = arr.slice(0, splitMatrix1)
  let arr2 = arr.slice(splitMatrix1, splitMatrix2)

  for (let i = 0; i < n_hidden; i++) {
    for (let j = 0; j < 1; j++) {
      matrix1.data[i][j] = arr1[i];
    }
  }

  for (let i = 0; i < n_output; i++) {
    for (let j = 0; j < 1; j++) {
      matrix2.data[i][j] = arr2[i];
    }
  }


  return [matrix1, matrix2];
}