// get canvas variable
var canvas3 = document.getElementById('thirdCanvas')
var ctx3 = canvas3.getContext('2d')

// get visualization option
// var showUpper = Document.getElementById("checkbox_shoeUpper").value()
var showUpper = false
var showLower = false

var bodyHeight = 160

// create a frame for the initial conditions
// phi = document.getElementById('phi_selector').value()
// w = document.getElementById('w_selector').value()
// ...
// TUTTE LE VARIABILI DI FRAME DEVONO ESSERE SPECIFICATE
// CM, SWING, LOWER, UPPER, POSITION ECC
// Frame initialCond = new Frame(.......)

// init variables for genetic env
var rope = new Rope(ctx3)
var swing = new Swing(ctx3)
var centerMass = new CenterMass(ctx3, showLower, showLower)
// var body = new Body(ctx3, initialCond)
var body = new Body(ctx3, bodyHeight)

rope.show()
swing.show()
centerMass.show()
body.show()