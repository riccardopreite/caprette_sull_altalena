class Frame {
  constructor(ctx, t, phi, w, bodyPosition, cm, swingCM, upperCM, lowerCM,
      swingType, gravity, bodyHeight, bodyMass, ropeLength) {
      this.ctx = ctx
      // required
      this.t = t
      this.phi = phi
      this.w = w
      this.bodyPosition = bodyPosition
      // optional
      this.cm = cm
      this.swingCM = swingCM
      this.upperCM = upperCM
      this.lowerCM = lowerCM
      // optional
      this.swingType = swingType
      this.gravity = gravity
      this.bodyHeight = bodyHeight
      this.bodyMass = bodyMass
      this.ropeLength = ropeLength
      // calculate CMs for the preview of the first frame

      if(isEmpty(this.cm)) this.calculateCM()
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

    calculateCM(){
      let basicSwingType = this.swingType
      basicSwingType = basicSwingType.replace("Genetic","")
      switch (basicSwingType) {
        case "standing":
        this.swingCM = calculateSwingCM(this.ropeLength,this.phi)
        this.upperCM = {}
        this.cm = calculateStandingBodyCM(this.ropeLength,this.bodyHeight,this.phi)
        this.lowerCM = {}
          break;
          
        case "seated":
        this.swingCM = calculateSwingCM(this.ropeLength,this.phi)
        this.upperCM = calculateSeatedBodyUpperCM(this.ropeLength,this.phi,this.bodyHeight*0.5)
        this.cm = calculateSeatedBodyCM(this.ropeLength,this.phi)
        this.lowerCM = calculateSeatedBodyLowerCM(this.ropeLength,this.phi,this.bodyHeight*0.5)
          break;

        case "realistic":
        this.swingCM = calculateSwingCM(this.ropeLength,this.phi)
        this.upperCM = calculateSeatedBodyUpperCM(this.ropeLength,this.phi,this.bodyHeight*0.6)
        this.cm = calculateSeatedBodyCM(this.ropeLength,this.phi)
        this.lowerCM = calculateSeatedBodyLowerCM(this.ropeLength,this.phi,this.bodyHeight*0.4)

          break;
        case "combined":
        this.swingCM = calculateSwingCM(this.ropeLength,this.phi)
        this.upperCM = calculateSeatedBodyUpperCM(this.ropeLength,this.phi,this.bodyHeight*0.6)
        this.cm = calculateSeatedBodyCM(this.ropeLength,this.phi)
        this.lowerCM = calculateSeatedBodyLowerCM(this.ropeLength,this.phi,this.bodyHeight*0.4)

          break;
        default:
          break;
      }
    }
}

/**
 *
 * @param {dict} coordinatesList: original coordinates list
 * @returns {Frame[]} frameArray: array of frame with scaled and translated
 * coordiantes
 */
function toCanvasCoordinates(coordinatesList, ctx,height,gravity,mass,ropeLength,swingType) {
    // TODO Proporzione dati input con dimensione canvas Scaling100:Canvas300=ScalingX:InputY o limite e pace
    var SCALE_FACTOR = 100
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
            bodyPosition,

            cm,
            swingCM,
            upperCM,
            lowerCM,

            swingType,
            gravity,
            height,
            mass,
            ropeLength,
        )
        tmpFrame.scaleFrame(SCALE_FACTOR)
        tmpFrame.traslateFrame()

        frameArray.push(tmpFrame)
    }
    return frameArray
}


function calculateSwingCM(ropeLength,phi){
  let tmp = {}
  tmp["x"] = ropeLength*Math.sin(phi)
  tmp["y"] = -(ropeLength*Math.cos(phi))
  return tmp;
}
/*******************************************************
        START SEATED CENTER MASS FUNCTION
*******************************************************/


function calculateSeatedBodyUpperCM(ropeLength,phi,height){
  let tmp = {}
  tmp["x"] = ropeLength*Math.sin(phi) - height*Math.sin(phi)
  tmp["y"] = -(ropeLength) + height*Math.cos(phi)
  return tmp;
}

function calculateSeatedBodyCM(ropeLength,phi){
  let tmp = {}
  tmp["x"] = ropeLength*Math.sin(phi)
  tmp["y"] = -(ropeLength*Math.cos(phi))
  return tmp;
}

function calculateSeatedBodyLowerCM(ropeLength,phi,height){
  let tmp = {}
  tmp["x"] = ropeLength*Math.sin(phi) + height*Math.sin(phi)
  tmp["y"] = -(ropeLength*Math.cos(phi)) - height*Math.cos(phi)
  return tmp;
}

/*******************************************************
        END CENTER MASS FUNCTION
*******************************************************/

/*******************************************************
        START STANDING CENTER MASS FUNCTION
*******************************************************/

function calculateStandingBodyCM(ropeLen,halfHeight,phi){
  let currentBarycenter = ropeLen - halfHeight + 0.4
  let tmp = {}
  tmp["x"] = currentBarycenter*Math.sin(phi)
  tmp["y"] = -currentBarycenter*Math.cos(phi)
  return tmp;
}

/*******************************************************
        END STANDING CENTER MASS FUNCTION
*******************************************************/
