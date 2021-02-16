class Rope {
    constructor(ctx,canvas){
        this.ctx = ctx
        this.startX = this.endX = this.ctx.canvas.width/2
        this.startY = 0
        this.endY = this.ctx.canvas.height/2
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