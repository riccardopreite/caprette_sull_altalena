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




// Color handling
function hex (c) {
    var s = "0123456789abcdef";
    var i = parseInt (c);
    if (i == 0 || isNaN (c))
      return "00";
    i = Math.round (Math.min (Math.max (0, i), 255));
    return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
  }

  /* Convert an RGB triplet to a hex string */
  function convertToHex (rgb) {
    return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
  }

  /* Remove '#' in color hex string */
  function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

  /* Convert a hex string to an RGB triplet */
  function convertToRGB (hex) {
    var color = [];
    color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
    color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
    color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
    return color;
  }

  function generateColor(colorStart,colorEnd,colorCount){

      // The beginning of your gradient
      var start = convertToRGB (colorStart);

      // The end of your gradient
      var end   = convertToRGB (colorEnd);

      // The number of colors to compute
      var len = colorCount;

      //Alpha blending amount
      var alpha = 0.0;

      var saida = [];

      for (i = 0; i < len; i++) {
          var c = [];
          alpha += (1.0/len);

          c[0] = start[0] * alpha + (1 - alpha) * end[0];
          c[1] = start[1] * alpha + (1 - alpha) * end[1];
          c[2] = start[2] * alpha + (1 - alpha) * end[2];

          saida.push(convertToHex (c));

      }

      return saida;

  }
