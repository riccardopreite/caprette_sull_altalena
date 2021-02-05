class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Frame {
    constructor(t, phi, w, bodyPosition, cm, swingCM, upperCM, lowerCM) {
        this.t = t
        this.phi = phi
        this.w = w

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
        this.cm["x"] += canvas.width / 2
        this.cm["y"] = Math.abs(this.cm["y"])

        this.swingCM["x"] += canvas.width / 2
        this.swingCM["y"] = Math.abs(this.swingCM["y"])
        if (this.upperCM != {}) {
            this.upperCM["x"] += canvas.width / 2
            this.upperCM["y"] = Math.abs(this.upperCM["y"])

            this.lowerCM["x"] += canvas.width / 2
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
}

/**
 *
 * @param {dict} coordinatesList: original coordinates list
 * @returns {Frame[]} frameArray: array of frame with scaled and translated
 * coordiantes
 */
function toCanvasCoordinates(coordinatesList) {
    // TODO Proporzione dati input con dimensione canvas Scaling100:Canvas300=ScalingX:InputY o limite e pace
    const SCALE_FACTOR = 100

    frameArray = []
    for (i in coordinatesList) {
        var tmpFrame = new Frame(
            coordinatesList[i]["t"],
            coordinatesList[i]["phi"],
            coordinatesList[i]["w"],
            coordinatesList[i]["bodyPosition"],
            coordinatesList[i].cm,
            coordinatesList[i].swingCM,
            coordinatesList[i].upperCM,
            coordinatesList[i].lowerCM
        )
        tmpFrame.scaleFrame(SCALE_FACTOR)
        tmpFrame.traslateFrame()

        frameArray.push(tmpFrame)
    }

    return frameArray
}

function selectMethods(resType ,res){
  if(firstMethode == resType) toDraw1 = toCanvasCoordinates(res)
  else if(secondMethode == resType) toDraw2 = toCanvasCoordinates(res)
}
