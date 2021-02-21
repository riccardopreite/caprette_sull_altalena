class Rope {
    /**
     * 
     * @param {Contex} ctx 
     * @param {Frame} initialStateFrame: (optional) indicates the init Frame
     *        it is automatically converted into canvas coordinates, ready to be displayed
     *                                  
     */
    constructor(ctx, initialStateFrame){
        this.ctx = ctx
        this.startX = this.ctx.canvas.width/2
        this.startY = 0
        this.endX = null
        this.endY = null

        if(initialStateFrame) {
            this.currentFrame = initialStateFrame.clone()
            this.currentFrame.scaleFrame()
            this.currentFrame.translateFrame()
            this.update(this.currentFrame)       
        }
    }

    show(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(this.endX, this.endY);
        this.ctx.strokeStyle = "rgba(255,255,255,0.6)";
        this.ctx.stroke();
    }

    update(frame){
        this.endX = frame.swingCM["x"]
        this.endY = frame.swingCM["y"]
    }
}
