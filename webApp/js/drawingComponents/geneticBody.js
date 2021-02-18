// Nerual Network nodes
var n_input = 3
var n_hidden = 4
var n_output = 1
// Positions set
var standing_positions = ["stand", "squat"]
var seated_positions = ["seat", "leanback"]
// limits
var MAX_PHI_ANGLE = 1.48353 //85 degree

class GeneticBody {
    /**
     * 
     * @param {*} ctx 
     * @param {String} type: "standing" or "seated", indicates which position are allowed  
     * @param {Frame} initialStateFrame: get initial Conditions from form
     * 
     * @var {Frame} stateFrame: store the current frame (at time t)
     * @var {Array String} positionsSet: store the allowed position based on the swing type
     * @var {String} nextPosition: indicates the next position that the neural network predicts
     * @var {NeuralNetwork} brain
     */
    constructor(ctx, type, initialStateFrame) {
        this.ctx = ctx

        // select proper postions set
        if (type == "standing")
            this.positionsSet = standing_positions
        else
            this.positionsSet = seated_positions

        // initial state
        this.stateFrame = initialStateFrame


        this.brain = new NeuralNetwork(n_input, n_hidden, n_output)
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
        input[0] = this.stateFrame.phi/MAX_PHI_ANGLE
        input[1] = this.stateFrame.w
        input[2] = this.positionsSet.indexOf(this.stateFrame.bodyPosition)

        let output = this.brain.predict(input)

        if (output < 0.5)
            this.nextPosition = this.positionsSet[0]
        else
            this.nextPosition = this.positionsSet[1]
    }

    update(frame) {
        this.stateFrame = frame
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
        var headRadius = 25
        // distance pelvis-rope
        var halfDIstanceStand = 10
        var halfDIstanceSquat = 40
        var handsDistance = 30

        var headX, headY
        var halfX, halfY
        var kneeX, kneeY
        var feetX, feetY
        var handX, handY

        switch (this.stateFrame.bodyPosition) {
            case "stand": {
                headX = this.swingX
                headY = this.swingY - this.height

                halfX = this.swingX - halfDIstanceStand
                halfY = headY + this.height / 2

                kneeX = this.swingX + halfDIstanceStand
                kneeY = halfY + this.height / 4

                feetX = this.swingX
                feetY = this.swingY
                break
            }
            case "squat": {
                headX = this.swingX
                headY = this.swingY - this.height / 2 - this.height / 4

                halfX = this.swingX - halfDIstanceSquat
                halfY = headY + this.height / 2 + this.height / 16

                kneeX = this.swingX + halfDIstanceSquat
                kneeY = this.swingY - this.height / 4 - this.height / 16

                feetX = this.swingX
                feetY = this.swingY
                break
            }
            case "seat": {
                headX = this.swingX
                headY = this.swingY - this.height / 2

                halfX = this.swingX
                halfY = this.swingY

                kneeX = halfX + this.height / 4
                kneeY = halfY

                feetX = kneeX
                feetY = this.swingY + this.height / 4
                break
            }
            case "leanback": {
                headX = this.swingX - this.height / 2
                headY = this.swingY

                halfX = this.swingX
                halfY = this.swingY

                kneeX = this.swingX + this.height / 4
                kneeY = halfY

                feetX = kneeX + this.height / 4
                feetY = kneeY

                handX = (headX + halfX) / 2
                handY = this.swingY
            }
        }

        // head
        this.ctx.beginPath();
        this.ctx.arc(headX, headY, headRadius, 0, 2 * Math.PI);

        this.ctx.strokeStyle = 'rgba(255,255,255,1)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.fillStyle = 'rgba(255,255,255,0.6)';
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
        if (this.stateFrame.bodyPosition == "leanback") {
            this.ctx.moveTo(handX, handY);
            this.ctx.lineTo(this.swingX, this.swingY - handsDistance);
            this.ctx.stroke();
        }
    }
}