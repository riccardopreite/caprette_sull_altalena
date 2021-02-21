class Swing {
      /**
     * 
     * @param {Contex} ctx 
     * @param {Frame} initialStateFrame: (optional) indicates the init Frame
     *        it is automatically converted into canvas coordinates, ready to be displayed
     *                                  
     */
    constructor(ctx, initialStateFrame) {
        this.ctx = ctx
        this.SWING_WIDTH = 60
        this.SWING_HEIGHT = 15
        this.swingX = null
        this.swingY = null

        if(initialStateFrame) {
            this.currentFrame = initialStateFrame.clone()
            this.currentFrame.scaleFrame()
            this.currentFrame.translateFrame()
            this.update(this.currentFrame)       
        }
    }

    /*
    (startX,startY) is the upper-left corner of the swing
     */
    show() {
        var startX = this.swingX - this.SWING_WIDTH / 2
        var startY = this.swingY

        this.ctx.translate(this.swingX, this.swingY)
        this.ctx.rotate(-this.phi)
        this.ctx.translate(-this.swingX, -this.swingY)

        this.ctx.strokeStyle = "rgba(255,255,255,1)";
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeRect(startX, startY, this.SWING_WIDTH, this.SWING_HEIGHT);

        this.ctx.fillStyle = "rgba(255,255,255,0.05)";
        this.ctx.fillRect(startX, startY, this.SWING_WIDTH, this.SWING_HEIGHT)
    }

    update(frame) {
        this.swingX = frame.swingCM["x"]
        this.swingY = frame.swingCM["y"]
        this.phi = frame.phi
    }
}