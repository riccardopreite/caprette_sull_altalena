class Body {
    constructor(ctx, height) {
        this.ctx = ctx

        this.phi = 0
        this.height = height
        this.position = "squat"

        this.cmX = canvas.width / 2
        this.cmY = canvas.height / 4
        this.swingX = canvas.width / 2
        this.swingY = canvas.height / 2
    }


    /*
    the body with specified height is compesed by 3 segments:
        - head-half = height/2
        - half-knee = height/4
        - knee-feet = height/4
    The proportion of the body scales accordingly with its height.

    The only point useed to calculate the coordinates is (swingX,swingY) - the cm of the swing,
    becuase is the only fixed point, unlike the cm of the body that varies with body's height.

    All rotations of phi are performed on (swingX,swingY).   
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

        switch (this.position) {
            case "stand": {
                headX = this.swingX
                headY = this.swingY - this.height

                halfX = this.swingX - halfDIstanceStand
                halfY = headY + this.height/2

                kneeX = this.swingX + halfDIstanceStand
                kneeY = halfY + this.height/4

                feetX = this.swingX
                feetY = this.swingY
                break
            }
            case "squat": {
                headX = this.swingX
                headY = this.swingY - this.height/2 - this.height/4

                halfX = this.swingX - halfDIstanceSquat
                halfY = headY + this.height/2 + this.height/8

                kneeX = this.swingX + halfDIstanceSquat
                kneeY = this.swingY - this.height/4 - this.height/8

                feetX = this.swingX
                feetY = this.swingY
                break
            }
            case "seat": {
                headX = this.swingX
                headY = this.swingY - this.height/2

                halfX = this.swingX
                halfY = this.swingY

                kneeX = halfX + this.height/4
                kneeY = halfY

                feetX = kneeX
                feetY = this.swingY + this.height/4
                break
            }
            case "leanback": {
                headX = this.swingX - this.height/2
                headY = this.swingY

                halfX = this.swingX
                halfY = this.swingY

                kneeX = this.swingX + this.height/4
                kneeY = halfY

                feetX = kneeX + this.height/4
                feetY = kneeY

                handX = (headX + halfX)/2
                handY = this.swingY
            }
        }

        // TODO use this.phi to rotate the points ==============================================

        // head
        this.ctx.beginPath();
        this.ctx.arc(headX, headY, headRadius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = "blue"
        this.ctx.stroke();

        // upper
        this.ctx.moveTo(headX, headY);
        this.ctx.lineTo(halfX, halfY);
        this.ctx.stroke();

        this.ctx.moveTo(halfX, halfY);
        this.ctx.lineTo(kneeX, kneeY);
        this.ctx.stroke();

        this.ctx.moveTo(kneeX, kneeY);
        this.ctx.lineTo(feetX, feetY);
        this.ctx.stroke();

        if(this.position == "leanback"){
            this.ctx.moveTo(handX, handY);
            this.ctx.lineTo(this.swingX, this.swingY-handsDistance);
            this.ctx.stroke();
        }
    }

    update(frame) {
        this.cmX = frame.cmX["x"]
        this.cmY = frame.cmY["y"]
        this.phi = frame["phi"]
        this.position = frame["bodyPosition"]
    }
}