$(document).ready(function () {
    M.AutoInit();
});

/// get computed style for image
var canvasContainer = document.getElementsByClassName('card-image');
var cs = getComputedStyle(canvasContainer[0]);


/// these will return dimensions in *pixel* regardless of what
/// you originally specified for image:
var width = parseInt(cs.getPropertyValue('width'), 10);
var height = parseInt(cs.getPropertyValue('height'), 10);

/// now use this as width and height for your canvas element:
var canvas = document.getElementById('canvas1');

canvas.width = width;
canvas.height = height;


var ctx = canvas.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

