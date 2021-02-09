class Swing {
    constructor(ctx){
        this.ctx = ctx
        this.SWING_WIDTH = 60
        this.SWING_HEIGHT = 15

        this.swingX = this.ctx.canvas.width/2
        this.swingY = this.ctx.canvas.height/2
        this.phi = 0.349066 //20 rad
    }

    /*
    (startX,startY) is the upper-left corner of the swing
     */
    show(){
        var startX = this.swingX - this.SWING_WIDTH/2
        var startY = this.swingY

        this.ctx.translate(this.swingX, this.swingY)
        this.ctx.rotate(-this.phi)
        this.ctx.translate(-this.swingX, -this.swingY)

        this.ctx.fillStyle = "#000"
        this.ctx.fillRect(startX, startY, this.SWING_WIDTH, this.SWING_HEIGHT)
    }

    update(frame){
        this.swingX = frame.swingCM["x"]
        this.swingY = frame.swingCM["y"]
        this.phi = frame.phi
    }
}
