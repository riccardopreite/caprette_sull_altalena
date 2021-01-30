class Body {
    constructor(ctx, height) {
        this.ctx = ctx

        this.phi = 0
        this.height = height
        this.position = "squat"

        this.cmX = canvas.width / 2
        this.cmY = canvas.height / 3
        this.swingX = canvas.width / 2
        this.swingY = canvas.height / 2
    }

    show() {
        // TODO use this.phi ==============================================
        var headRadius = 30
        // distance pelvis-rope
        var halfDIstance = 30

        switch (this.position) {
            case "stand": {
                var headX = this.cmX
                var headY = this.cmY - this.height / 2

                var halfX = this.cmX - halfDIstance
                var halfY = this.cmY
                break
            }
            case "squat": {
                var headX = this.cmX
                var headY = this.cmY - this.height / 4
    
                var halfX = this.cmX - halfDIstance
                var halfY = this.cmY + this.height / 8
                break
            }
        }     

        // head
        this.ctx.beginPath();
        this.ctx.arc(headX, headY, headRadius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = "blue"
        this.ctx.stroke();
        // upper
        ctx.moveTo(headX, headY);
        ctx.lineTo(halfX, halfY);
        ctx.stroke();
        // lower 
        ctx.moveTo(halfX, halfY);
        ctx.lineTo(this.swingX, this.swingY);
        ctx.stroke();
    }

    update(frame) {
        this.cmX = frame.cmX["x"]
        this.cmY = frame.cmY["y"]
        this.phi = frame["phi"]
        this.position = frame["bodyPosition"]
    }
}