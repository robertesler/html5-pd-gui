//canvas, ctx, scale, circleColor, dialColor, font, lineWidth
var dial = new Array();

var dial1 = document.getElementById('dial1');
var dial1Ctx = dial1.getContext('2d');

var dial2 = document.getElementById('dial2');
var dial2Ctx = dial2.getContext('2d');

dial.push( new Dial(dial1, dial1Ctx, .5, '#325FA2', '#D40000', "24px Arial", 10) );
dial.push( new Dial(dial2, dial2Ctx, .25, '#000000', '#808080', "12px Arial", 8) );

dial[0].drawDial();
dial[1].drawDial();

var button = new Array();

//canvas, ctx, scale, buttonColor, lineColor, pressColor, font, lineWidth
var button1 = document.getElementById('button1');
var button1Ctx = button1.getContext('2d');

var button2 = document.getElementById('button2');
var button2Ctx = button2.getContext('2d');

button.push ( new Button(button1, button1Ctx, 1, '#FFFF00', '#000000', '#325FA2', "12px Arial", 3));
button.push ( new Button(button2, button2Ctx, .5, '#808080','#000000', '#900000', "12px Arial", 3));

button[0].drawButton();
button[1].drawButton();

//canvas, ctx, backgroundColor, sliderColor, rangeLow, rangeHigh, font, lineWidth, lineColor, width, height, axis

var slider = new Array();

var slider1 = document.getElementById('slider1');
var slider1Ctx = slider1.getContext('2d');

var slider2 = document.getElementById('slider2');
var slider2Ctx = slider2.getContext('2d');

slider.push( new Slider(slider1, slider1Ctx, '#FFFF00', '#356100',  0, 100, "12px Arial", 2, '#000000', 25, 100, 'v'));

slider.push( new Slider(slider2, slider2Ctx, '#FFFFF0', '#800000',  0, 100, "12px Arial", 4, '#000000', 40, 100, 'v'));

//onsole.log(slider[0]);
slider[0].drawSlider();
slider[1].drawSlider();