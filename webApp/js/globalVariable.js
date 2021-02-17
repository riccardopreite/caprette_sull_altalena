/*************************
  SOCKET VARIABLE
*************************/

var namespace = '/test';
var socket = io(namespace);

/*************************
        END SECTION
*************************/


/*************************
  DEFAULT VALUE FOR SWING CALC
*************************/

var ropeLengthDef = 2.7, // 2.7 metri default = metà del canvas| MAX?
bodyHeightDef = 1.6,     // 1.0 metri default
bodyMass = 20,           // 20.0kg default
gravityDef = 9.8,        // 9.8 m/s^2 default
initPhiDef = -0.5,      //-0.05 default
initWDef = 0.00,         // 0.00 default
initPos = "squat"
var initFrame = []

/*************************
        END SECTION
*************************/


/*************************
  STRING FOR SWING TYPE
*************************/

var firstMethode = "", secondMethode = "";
var oldFirst = "",  oldSecond = "";
/*************************
        END SECTION
*************************/


/*************************
  DRAWING COMPONENTS UTILS
*************************/

var showUpper0 = undefined
var showLower0 = undefined
var phi0 = undefined
var w0 = undefined
var gravity0 = undefined
var mass0 = undefined
var bodyHeight0 = undefined
var ropeLength0 = undefined
var bodyPosition0 = undefined

var showUpper1 = undefined
var showLower1 = undefined
var phi1 = undefined
var w1 = undefined
var gravity1 = undefined
var mass1 = undefined
var bodyHeight1 = undefined
var ropeLength1 = undefined
var bodyPosition1 = undefined


/*************************
        END SECTION
*************************/


/*************************
        CANVAS LIST
*************************/

var canvasList = [];

/*************************
        END SECTION
*************************/


/*************************
  INTERVAL DRAW CONTROLLER
*************************/

var firstInterval = undefined,
    secondInterval = undefined;
var firstIntervalTimer = 10,
    secondIntervalTimer = 10;

/*************************
        END SECTION
*************************/

/*************************
  BOOLEAN FOR SWING TYPE CHANGE
*************************/

var firstChange = false, secondChange = false;

/*************************
        END SECTION
*************************/

/*************************
  BOOLEAN FOR FREEZE SCREEN WHILE LOAD DATA
*************************/
var freeze = false;
