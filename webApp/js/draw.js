// get canvas variable
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// get visualization option 
// var showUpper = Document.getElementById("checkbox_shoeUpper").value()
var showUpper = false
var showLower = false

var bodyHeight = 160

// init frame list for both environment
var standing_frameList,
    seated_frameList,
    realistic_frameList,
    combined_frameList

// init varible obj for both environment
var rope1 = new Rope(ctx)
var swing1 = new Swing(ctx)
var centerMass1 = new CenterMass(ctx, showLower, showLower)
var body1 = new Body(ctx, bodyHeight)


/*
IMPORTANT: always put swing BEFORE body show.
Body coordinates (and rotations) are calculated based on the Swing
 */
rope1.show()
swing1.show()
// centerMass1.show()
body1.show()

// update() cycle
// for f in frameList {
//   clear()
//
//   Rope.update(f)
//   CenterMass.update(f)
//   Swing.update(f)
//   Body.update(f)
//   Animate() }