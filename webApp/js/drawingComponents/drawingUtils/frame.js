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
   * @returns {Frame}: new frame with current values
   */
  clone(){
    return new Frame(
      this.ctx,
      this.t,
      this.phi,
      this.w,
      this.bodyPosition,
      this.cm,
      this.swingCM,
      this.upperCM,
      this.lowerCM,
      this.swingType,
      this.gravity,
      this.bodyHeight,
      this.bodyMass,
      this.ropeLength
    )
  }


    /**
     * Adapt original coordinates to the canvas coordinates system
     * x -> x+canvas.width/2 (move x to the center of the canvas)
     * y -> |y| (invert the y axis to match canvas)
     */
    translateFrame() {
        var halfCanvas_offset = this.ctx.canvas.width/2

        this.cm["x"] += halfCanvas_offset
        this.cm["y"] = Math.abs(this.cm["y"])

        this.swingCM["x"] += halfCanvas_offset
        this.swingCM["y"] = Math.abs(this.swingCM["y"])

        if (this.upperCM != {}) {
            this.upperCM["x"] += halfCanvas_offset
            this.upperCM["y"] = Math.abs(this.upperCM["y"])

            this.lowerCM["x"] += halfCanvas_offset
            this.lowerCM["y"] = Math.abs(this.lowerCM["y"])
        }
    }

    /**
     * Scale any coordinates by a factor
     */
    scaleFrame() {
        const SCALE_FACTOR = 100

        this.cm["y"] = this.cm["y"] * SCALE_FACTOR
        this.cm["x"] = this.cm["x"] * SCALE_FACTOR

        this.swingCM["x"] = this.swingCM["x"] * SCALE_FACTOR
        this.swingCM["y"] = this.swingCM["y"] * SCALE_FACTOR
        if (this.upperCM != {}) {
            this.upperCM["x"] = this.upperCM["x"] * SCALE_FACTOR
            this.upperCM["y"] = this.upperCM["y"] * SCALE_FACTOR

            this.lowerCM["x"] = this.lowerCM["x"] * SCALE_FACTOR
            this.lowerCM["y"] = this.lowerCM["y"] * SCALE_FACTOR
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
 * @param {Framme} currentFrame: frame with current conditions 
 * @param {String} nextPostion: Indicates the postion for the next frame
 *                              "squat" or "stand"
 *                              "seat" or "leanback"
 * @param {Frame} nextFrame: the frame with updated conditions based on nextPosition 
 */
function getNextFrame(currentFrame, nextPostion){
  const DELTA_T = 0.001
  var w_next
  var phi_next
  

  if (currentFrame.swingType.includes("standing")){
    
   



  } else {





  }
  var t_next = currentFrame.t + DELTA_T

  return nextFrame = new Frame(
    currentFrame.ctx,
    t_next,
    phi_next,
    w_next,
    nextPostion,
    next_cm,
    next_swingCM,
    next_upperCM,
    next_lowerCM,
    currentFrame.swingType,
    currentFrame.gravity,
    currentFrame.bodyHeight,
    currentFrame.bodyMass,
    currentFrame.ropeLength
  )  
}








/**
 *
 * @param {dict} coordinatesList: original coordinates list
 * @returns {Frame[]} frameArray: array of frame with scaled and translated
 * coordiantes
 */
function toCanvasCoordinates(coordinatesList, ctx,height,gravity,mass,ropeLength,swingType) {
    // TODO Proporzione dati input con dimensione canvas Scaling100:Canvas300=ScalingX:InputY o limite e pace
    var frameArray = []
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
        tmpFrame.scaleFrame()
        tmpFrame.translateFrame()

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
