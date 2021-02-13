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
bodyHeightDef = 1.0,     // 1.0 metri default
bodyMass = 20,           // 20.0kg default
gravityDef = 9.8,        // 9.8 m/s^2 default
initPhiDef = -0.50,      //-0.5 default
initWDef = 0.00;         // 0.00 default

/*************************
        END SECTION
*************************/


/*************************
  STRING FOR SWING TYPE
*************************/

var firstMethode = "", secondMethode = "";

/*************************
        END SECTION
*************************/


/*************************
  DRAWING COMPONENTS UTILS
*************************/

var showUpper0 = undefined
var showLower0 = undefined
var bodyHeight0 = undefined

var showUpper1 = undefined
var showLower1 = undefined
var bodyHeight1 = undefined

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
var firstIntervalTimer = 100,
    secondIntervalTimer = 100;

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
