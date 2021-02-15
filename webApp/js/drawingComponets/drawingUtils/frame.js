class Frame {
    constructor(ctx, t, phi, w,gravity,mass,height,ropeLength, bodyPosition, cm, swingCM, upperCM, lowerCM) {
        this.ctx = ctx

        this.t = t
        this.phi = phi
        this.w = w
        this.gravity = gravity
        this.mass = mass
        this.height = height
        this.ropeLength = ropeLength



        this.bodyPosition = bodyPosition
        this.cm = cm
        this.swingCM = swingCM
        this.upperCM = upperCM
        this.lowerCM = lowerCM
    }

    /**
     * Adapt original coordinates to the canvas coordinates system
     * x -> x+canvas.width/2 (move x to the center of the canvas)
     * y -> |y| (invert the y axis to match canvas)
     */
    traslateFrame() {
        this.cm["x"] += this.ctx.canvas.width / 2
        this.cm["y"] = Math.abs(this.cm["y"])

        this.swingCM["x"] += this.ctx.canvas.width / 2
        this.swingCM["y"] = Math.abs(this.swingCM["y"])
        if (this.upperCM != {}) {
            this.upperCM["x"] += this.ctx.canvas.width / 2
            this.upperCM["y"] = Math.abs(this.upperCM["y"])

            this.lowerCM["x"] += this.ctx.canvas.width / 2
            this.lowerCM["y"] = Math.abs(this.lowerCM["y"])
        }
    }
    /**
     * Scale any coordinates by a factor
     */
    scaleFrame(scaleFactor) {
        this.cm["y"] = this.cm["y"] * scaleFactor
        this.cm["x"] = this.cm["x"] * scaleFactor

        this.swingCM["x"] = this.swingCM["x"] * scaleFactor
        this.swingCM["y"] = this.swingCM["y"] * scaleFactor
        if (this.upperCM != {}) {
            this.upperCM["x"] = this.upperCM["x"] * scaleFactor
            this.upperCM["y"] = this.upperCM["y"] * scaleFactor

            this.lowerCM["x"] = this.lowerCM["x"] * scaleFactor
            this.lowerCM["y"] = this.lowerCM["y"] * scaleFactor
        }
    }

    updateCM(swingCM,upperCM,cm,lowerCM){
      this.swingCM = swingCM
      this.upperCM = upperCM
      this.cm = cm
      this.lowerCM = lowerCM
    }
}

/**
 *
 * @param {dict} coordinatesList: original coordinates list
 * @returns {Frame[]} frameArray: array of frame with scaled and translated
 * coordiantes
 */
function toCanvasCoordinates(coordinatesList, ctx,height,gravity,mass,ropeLength) {
    // TODO Proporzione dati input con dimensione canvas Scaling100:Canvas300=ScalingX:InputY o limite e pace
    var SCALE_FACTOR = 100 / (height / bodyHeightDef)
    frameArray = []
    for (i in coordinatesList) {
      let t = coordinatesList[i]["t"],
      phi = coordinatesList[i]["phi"],
      w = coordinatesList[i]["w"],
      bodyPosition = coordinatesList[i]["bodyPosition"],
      cm = coordinatesList[i].cm,
      swingCM = coordinatesList[i].swingCM,
      upperCM = coordinatesList[i].upperCM,
      lowerCM = coordinatesList[i].lowerCM
        var tmpFrame = new Frame(
            ctx,
            t,
            phi,
            w,
            gravity,
            mass,
            height,
            ropeLength,
            bodyPosition,
            cm,
            swingCM,
            upperCM,
            lowerCM
        )
        tmpFrame.scaleFrame(SCALE_FACTOR)
        tmpFrame.traslateFrame()

        frameArray.push(tmpFrame)
    }
    return frameArray
}
