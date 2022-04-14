/*
Dials
*/

//Dial(canvas, ctx, scale, rName, circleColor, dialColor, font, lineWidth)
var dial = new Array();

var dial1 = document.getElementById('dial1');
var dial1Ctx = dial1.getContext('2d');

var dial2 = document.getElementById('dial2');
var dial2Ctx = dial2.getContext('2d');

dial.push( new Dial(dial1, dial1Ctx, .5, 'test1', '#c94c4c', '#eea29a', "24px Arial", 10) );
dial.push( new Dial(dial2, dial2Ctx, .25, 'test2', '#000000', '#808080', "12px Arial", 8) );

dial[0].drawDial();
dial[1].drawDial();

/*
Buttons
*/
var button = new Array();

//Button(canvas, ctx, scale, rName, buttonColor, lineColor, pressColor, font, lineWidth)
var button1 = document.getElementById('button1');
var button1Ctx = button1.getContext('2d');

var button2 = document.getElementById('button2');
var button2Ctx = button2.getContext('2d');

button.push ( new Button(button1, button1Ctx, 1, 'bang1', '#667292', '#000000', '#8d9db6', "12px Arial", 3));
button.push ( new Button(button2, button2Ctx, .5, 'bang2', '#405d27','#000000', '#82b74b', "12px Arial", 3));

button[0].drawButton();
button[1].drawButton();

/*
Sliders
*/

//Slider(canvas, ctx, rName, backgroundColor, sliderColor, rangeLow, rangeHigh, font, lineWidth, lineColor, width, height, axis)

var slider = new Array();

var slider1 = document.getElementById('slider1');
var slider1Ctx = slider1.getContext('2d');

var slider2 = document.getElementById('slider2');
var slider2Ctx = slider2.getContext('2d');

var slider3 = document.getElementById('slider3');
var slider3Ctx = slider3.getContext('2d');

slider.push( new Slider(slider1, slider1Ctx, 'slider1', '#FFFFFF', '#000000',  0, 100, "12px Arial", 2, '#000000', 25, 100, 'v'));

slider.push( new Slider(slider2, slider2Ctx, 'slider2', '#6b5b95', '#feb236',  0, 100, "12px Arial", 4, '#000000', 40, 100, 'v'));
//axis = 'h' is horizonatl, 'v' is vertical
slider.push( new Slider(slider3, slider3Ctx, 'slider3', '#6b5b95', '#feb236',  0, 100, "12px Arial", 2, '#000000', 100, 40, 'h'));

//onsole.log(slider[0]);
slider[0].drawSlider();
slider[1].drawSlider();
slider[2].drawSlider();

/*
Toggles
*/

//Toggle (canvas, ctx, scale, rName, toggleColor, lineColor, font, lineWidth)
var toggle = new Array();

var toggle1 = document.getElementById('toggle1');
var toggle1Ctx = toggle1.getContext('2d');

var toggle2 = document.getElementById('toggle2');
var toggle2Ctx = toggle2.getContext('2d');

toggle.push( new Toggle(toggle1, toggle1Ctx, 1, 'toggle1', '#FFFFFF', '#000000', "12px Arial", 2) );
toggle.push( new Toggle(toggle2, toggle2Ctx, 1, 'toggle2', '#6b5b95', '#000000', "12px Arial", 3) );

toggle[0].drawToggle();
toggle[1].drawToggle();
