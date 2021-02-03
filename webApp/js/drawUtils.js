class Point {
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

/**
 *
 * @param {Point} center = rotation center
 * @param {*} rad
 * @param {Point} arr = array of points to be rotated
 */

function rotate(center, rad, arr){
    var rotated_points = []
    arr.forEach(point => {

        if(rad > 0){
            // counter clockwise rotation
            x = (point.x-center.x)*Math.cos(rad)-(point.y+center.y)*Math.sin(rad)+center.x
            y = (point.x-center.x)*Math.sin(rad)+(point.y+center.y)*Math.cos(rad)-center.y
        } else {
            // clockwise rotation
            x = (point.x-center.x)*Math.cos(rad)+(point.y+center.y)*Math.sin(rad)+center.x
            y = -(point.x-center.x)*Math.sin(rad)+(point.y+center.y)*Math.cos(rad)-center.y
        }
        var p = new Point(x,y)
        rotated_points.push(p)
    });
    return rotated_points
}

function toCanvasFrame(list,frameArray){
  let ind = 0
  for(f in list){
    frameArray[ind] = new Frame(ctx,list[f]["phi"],list[f]["w"],list[f]["bodyPosition"],list[f]["t"],list[f].swingCM,list[f].cm,list[f].upperCM,list[f].lowerCM)
    frameArray[ind].zoomList()
    frameArray[ind].traslateList()
    ind++;
  }

  toDraw = frameArray
  console.log(frameArray);
}
