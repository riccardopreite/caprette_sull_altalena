class Frame {
    constructor(ctx,phi,w,bodyPosition,t,swingCM,cm,upperCM,lowerCM){
      this.ctx = ctx
      this.phi = phi
      this.w = w
      this.bodyPosition = bodyPosition
      this.t = t
      this.swingCM = swingCM
      this.cm = cm
      this.upperCM = upperCM
      this.lowerCM = lowerCM
    }

    traslateList(){
        this.swingCM["x"] += canvas.width/2
        this.cm["x"] += canvas.width/2
        this.swingCM["y"] = Math.abs(this.swingCM["y"])// * (-1)
        this.cm["y"] = Math.abs(this.cm["y"])// * (-1)
        if(this.upperCM != {}){
          this.upperCM["x"] += canvas.width/2
          this.lowerCM["x"] += canvas.width/2
          this.upperCM["y"] = Math.abs(this.upperCM["y"])// * (-1)
          this.lowerCM["y"] = Math.abs(this.lowerCM["y"])// * (-1)
        }
    }

    zoomList(){
        this.swingCM["x"]  = this.swingCM["x"] * 100
        this.cm["x"] = this.cm["x"] * 100
        this.swingCM["y"] = this.swingCM["y"] * 100// * (-1)
        this.cm["y"] = this.cm["y"] * 100// * (-1)
        if(this.upperCM != {}){
          this.upperCM["x"] = this.upperCM["x"] * 100
          this.lowerCM["x"] = this.lowerCM["x"] * 100
          // this.upperCM["y"] = this.upperCM["y"] * 100// * (-1)
          // this.lowerCM["y"] = this.lowerCM["y"] * 100// * (-1)
        }
    }
}
