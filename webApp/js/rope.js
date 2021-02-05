class Rope {
    constructor(ctx){
        this.ctx = ctx
        this.startX = this.endX = canvas.width/2
        this.startY = 0
        this.endY = canvas.height/2
    }

    show(){
        console.log("show")

        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        // TODO rope length
        this.ctx.lineTo(this.endX, this.endY);
        this.ctx.strokeStyle = "#FF0000";
        this.ctx.stroke();
    }

    update(frame){
        this.endX = frame.swingCM["x"]
        this.endY = frame.swingCM["y"]// + canvas.height/2
    }
}
