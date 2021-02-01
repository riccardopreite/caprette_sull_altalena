class Swing {
    constructor(ctx){
        this.ctx = ctx
        this.SWING_WIDTH = 70
        this.SWING_HEIGHT = 20
        
        this.cmX = canvas.width/2
        this.cmY = canvas.height/2
        this.phi = 0
    }

    show(){
        var startX = this.cmX - this.SWING_WIDTH/2
        // TODO consider phi angle in startY computing
        // this.phi
        var startY = this.cmY
        this.ctx.fillRect(startX, startY, this.SWING_WIDTH, this.SWING_HEIGHT)
    }

    update(frame){
        this.cmX = frame.swingCm["x"]
        this.cmY = frame.swingCm["y"]
        this.phi = frame["phi"]
    }
}