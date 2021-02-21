// limits
var MAX_PHI_ANGLE = 1.48353 //85 degree
// Positions set
var standing_positions = ["stand", "squat"]
var seated_positions = ["seat", "leanback"]
// Nerual Network 
var n_input = 3
var n_hidden = 4
var n_output = 2
const MUTATION_RATE = 0.1
// scoring
var SCORE_BONUS = 500
var JUMP_PENALIZATION = 1



class GeneticBody {
    /**
     *
     * @param {*} ctx
     * @param {String} type: "standing" or "seated", is the value of select form. Indicates which position are allowed
     * @param {Frame} initialStateFrame: get initial Conditions from form
     * 
     * @var {Array String} positionsSet: store the allowed position based on the swing type
     * @var {Frame array} DNA: store the sequence of frames
     * @var {Frame} currentFrame: store the last frame
     * 
     * @var {NeuralNetwork} brain
     * @var {int} max_phi: store the record phi reached in absolute value
     * @var {String} nextPosition: indicates the next position that the neural network predicts
     * 
     * @var {Boolean} reachMaxPhi: indicates if the body reaches (>=) MAX_PHI_ANGLE.
     *                             Consequently the body will have a score of SCORE_BONUS*2 - JUMPS.
     *                             if set to TRUE the body will be removed in the next draw iteration. 
     * @var {Jump} jumps: array of jumps performed
     * 
     */
    constructor(ctx, initialStateFrame, brain) {
        this.ctx = ctx

        // select proper postions set
        if (initialStateFrame.swingType.includes("standing"))
            this.positionsSet = standing_positions
        else
            this.positionsSet = seated_positions

        // State
        this.currentFrame = initialStateFrame
        this.showingFrameList = []
        

        // handle creation or copy
        if(brain)
            this.brain = brain.copy()
        else 
            this.brain = new NeuralNetwork(n_input, n_hidden, n_output)


        // scoring var
        this.max_phi = Math.abs(this.currentFrame.phi)
        this.score = SCORE_BONUS
        this.fitness = 0
        this.reachMaxPhi = false

        // Log
        this.jumps = []

        this.nextPosition = null
    }


    /**
     * Gives the current input, the network make a predition,
     * that is stored in nextPosition
     *
     * input:
     *  - phi: normalized [-1,1] with MAX_PHI_ANGLE
     *  - w
     *  - [0,1]: indicates the current postion in the positionsSet
     * output:
     *  - [0,1]: indicates the next postion in the positionsSet
     */
    think() {
        let input = []
        input[0] = this.currentFrame.phi / MAX_PHI_ANGLE
        input[1] = this.currentFrame.w
        input[2] = this.positionsSet.indexOf(this.currentFrame.bodyPosition)

        let output = this.brain.predict(input)

        if (output[0] > output[1])
            this.nextPosition = this.positionsSet[0]
        else
            this.nextPosition = this.positionsSet[1]
    }


    mutate(){
        this.brain.mutate(MUTATION_RATE)
    }


    /**
     * When angular speed is 0 
     * @returns {Boolean} true -> is the reached angle is greater (>) than the previous record angle
     *                    false -> otherwise 
     */
    isImproving() {
        return this.currentFrame.w == 0 && (Math.abs(this.currentFrame.phi) > this.max_phi)
    }


    /**
     * Always called when a new frame arrives.
     *      - if new record angle is reached
     *          - Update record angle
     *          - Update the score with a FIXED BONUS + PROPORTIAL PHI BONUS.
     *      - if MAX PHI ANGLE is reached
     *          - stopTraining 
     */
    updatePhiScore() {
        if (this.isImproving()) {
            // update max phi angle
            this.max_phi = Math.abs(this.currentFrame.phi)
            // update score: constant + score proportional to the record phi
            this.score += SCORE_BONUS + Math.round(SCORE_BONUS * (this.max_phi / MAX_PHI_ANGLE))
        }

        if (this.max_phi >= MAX_PHI_ANGLE)
            this.reachMaxPhi = true
    }


    /**
     * Log body information
     * Score: 500
     * Fitness: 45
     * Number of Jumps: 245
     * --------------------------------------------
     * t:0.000->0.001 - phi:0.05->0.12 - w:"0.32"->"0.56" - standing->seated
     * ...   
     */
    log() {
        var logMsg = ""
        logMsg += "Score: " + this.score + "\n"
        logMsg += "Fitness: " + this.fitness*100 + "\n"
        logMsg += "Number of jumps: " + this.jumps.length + "\n"
        logMsg += "-------------------------------------------\n"
        this.jumps.forEach(jump => {
            logMsg += jump.toString() + "\n"
        })
        return logMsg
    }



    /**
     * 
     * @param {Frame} frame: frame with the next conditions
     *      - handle jumps
     *      - update DNA and currentFrame
     *      - update score (if new record angle is reached) 
     */
    update(frame) {
        // jumpHandler
        if (this.currentFrame.bodyPosition !== frame.bodyPosition) {
            this.jumps.push(new Jump(this.currentFrame, frame))
            this.score -= JUMP_PENALIZATION
        }

        // new state
        this.currentFrame = frame

        //updateScore
        this.updatePhiScore()
    }

    /*
    Draw the body based on its position.
    The only point useed to calculate the coordinates is (swingX,swingY) - the cm of the swing,
    becuase is the only fixed point, unlike the cm of the body that varies with body's height.
    (SwingX,SwingY) is previously rotated so that the body has the correct inclination.

    the body with specified height is compesed by 3 segments:
        - head-half = height/2
        - half-knee = height/4
        - knee-feet = height/4
    The proportion of the body scales accordingly with its height.
    */
    show() {
        // utils vars
        const headRadius = 25
        const halfDIstanceStand = 10
        const halfDIstanceSquat = 40
        const handsDistance = 30
        var headX, headY
        var halfX, halfY
        var kneeX, kneeY
        var feetX, feetY
        var handX, handY


        var showingFrame = this.currentFrame.clone()
        showingFrame.scaleFrame()
        showingFrame.translateFrame()
        this.showingFrameList.push(showingFrame)

        switch (showingFrame.bodyPosition) {
            case "stand": {
                headX = showingFrame.swingX
                headY = showingFrame.swingY - showingFrame.bodyHeight

                halfX = showingFrame.swingX - halfDIstanceStand
                halfY = headY + showingFrame.bodyHeight / 2

                kneeX = showingFrame.swingX + halfDIstanceStand
                kneeY = halfY + showingFrame.bodyHeight / 4

                feetX = showingFrame.swingX
                feetY = showingFrame.swingY
                break
            }
            case "squat": {
                headX = showingFrame.swingX
                headY = showingFrame.swingY - showingFrame.bodyHeight / 2 - showingFrame.bodyHeight / 4

                halfX = showingFrame.swingX - halfDIstanceSquat
                halfY = headY + showingFrame.bodyHeight / 2 + showingFrame.bodyHeight / 16

                kneeX = showingFrame.swingX + halfDIstanceSquat
                kneeY = showingFrame.swingY - showingFrame.bodyHeight / 4 - showingFrame.bodyHeight / 16

                feetX = showingFrame.swingX
                feetY = showingFrame.swingY
                break
            }
            case "seat": {
                headX = showingFrame.swingX
                headY = showingFrame.swingY - showingFrame.bodyHeight / 2

                halfX = showingFrame.swingX
                halfY = showingFrame.swingY

                kneeX = halfX + showingFrame.bodyHeight / 4
                kneeY = halfY

                feetX = kneeX
                feetY = showingFrame.swingY + showingFrame.bodyHeight / 4
                break
            }
            case "leanback": {
                headX = showingFrame.swingX - showingFrame.bodyHeight / 2
                headY = showingFrame.swingY

                halfX = showingFrame.swingX
                halfY = showingFrame.swingY

                kneeX = showingFrame.swingX + showingFrame.bodyHeight / 4
                kneeY = halfY

                feetX = kneeX + showingFrame.bodyHeight / 4
                feetY = kneeY

                handX = (headX + halfX) / 2
                handY = showingFrame.swingY
            }
        }

        // head
        this.ctx.beginPath();
        this.ctx.arc(headX, headY, headRadius, 0, 2 * Math.PI);

        this.ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
        this.ctx.fill();
        // head-half
        this.ctx.moveTo(headX, headY);
        this.ctx.lineTo(halfX, halfY);
        this.ctx.stroke();
        // half-knee
        this.ctx.moveTo(halfX, halfY);
        this.ctx.lineTo(kneeX, kneeY);
        this.ctx.stroke();
        // knee-feet
        this.ctx.moveTo(kneeX, kneeY);
        this.ctx.lineTo(feetX, feetY);
        this.ctx.stroke();
        // hands
        if (this.showingFrame.bodyPosition == "leanback") {
            this.ctx.moveTo(handX, handY);
            this.ctx.lineTo(this.swingX, this.swingY - handsDistance);
            this.ctx.stroke();
        }
    }
}