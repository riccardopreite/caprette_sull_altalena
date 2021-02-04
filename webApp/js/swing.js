class Swing {
    constructor(ctx){
        this.ctx = ctx
        this.SWING_WIDTH = 70
        this.SWING_HEIGHT = 20

        this.swingX = canvas.width/2
        this.swingY = canvas.height/2
        this.phi = 0.349066 //20 rad
    }

    /*
    (startX,startY) is the upper-left corner of the swing
     */
    show(){
      ctx.save()
        var startX = this.swingX - this.SWING_WIDTH/2
        var startY = this.swingY

        this.ctx.translate(this.swingX, this.swingY)
        this.ctx.rotate(-this.phi)
        this.ctx.translate(-this.swingX, -this.swingY)

        this.ctx.fillRect(startX, startY, this.SWING_WIDTH, this.SWING_HEIGHT)
        ctx.restore()
    }

    update(frame){
        this.swingX = frame.swingCM["x"]
        this.swingY = frame.swingCM["y"] //+ canvas.height/2
        this.phi = frame.phi
    }
}
