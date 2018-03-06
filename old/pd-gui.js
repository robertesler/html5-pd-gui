var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//console.log(ctx);
var obj;
var tick = 137;
var mouseIsDown = false;

var dial = {
  
  radius: canvas.width * .8,
  scale: .5,
  circleColor: '#325FA2',
  dialColor: '#D40000',
  font: "24px Arial",
  circleLineWidth: 10,
  value: 0,
  draw: function() {

  //the circle
  ctx.save();
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.scale(this.scale,this.scale);
  //ctx.rotate(-Math.PI/180);
  ctx.fillStyle = "white";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  
  
	  
  // The needle
  ctx.save();
  ctx.rotate(tick * Math.PI/180);
  ctx.strokeStyle = this.dialColor;
  ctx.fillStyle = this.dialColor;
  ctx.lineWidth = this.circleLineWidth;
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(this.radius-2,0);
  ctx.closePath();//this was the trick
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  //blue border
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = this.circleColor;
  ctx.arc(0,0,this.radius, 2.4, 7, false);
  ctx.stroke();
  ctx.restore();
	  
	  //the numbers
  ctx.font = this.font;
  ctx.fillText(Math.round(this.value), canvas.width*.45, canvas.height*.9);
  }
};


function draw() {
	dial.draw();
	obj = window.requestAnimationFrame(draw);
}

canvas.addEventListener("mousedown", function(event) {
    //tick += 1;
//	console.log("mouse: " + tick);
	obj = window.requestAnimationFrame(draw);
	mouseIsDown = true;
});

canvas.addEventListener("mouseup", function(e) {
	mouseIsDown = false;
});

canvas.addEventListener("mousemove", function(e) {
	//console.log("x: " + e.clientX + " | y: " + e.clientY);
	var X = e.clientX;
	var Y = e.clientY;
	
	var leftSide = canvas.width/2 - (dial.radius * dial.scale) + dial.circleLineWidth;
	var rightSide = canvas.width/2 + (dial.radius * dial.scale) + dial.circleLineWidth;
	var top = canvas.height/2 - (dial.radius * dial.scale) + dial.circleLineWidth;
	var bottom = canvas.height/2 + (dial.radius * dial.scale) + dial.circleLineWidth;
		
	X -= leftSide;
	//Y -= top;
	Y = Y - bottom;
	Y *= -1;
	
	X = X - (dial.radius * dial.scale);
	Y = Y - (dial.radius * dial.scale);
	
    //this calculates our angle based on where the mouse is
    var angle = -1*(Math.atan2(Y,X) * (180/Math.PI));
	
	//This will not let the dial draw if it's outside the visual border
	var adjustment = -1*(Math.atan2(Y,X) * (180/Math.PI)+137);
	
	if(adjustment < 0)
		{
			adjustment = 180 + (180+adjustment);
		}
	
	if(angle < 0)
		{
			angle = 180 + (180+angle);
		}
	
	if(mouseIsDown && adjustment < 263)
		{
			tick = angle;
			var range = adjustment/263;
			range *= 100;
			dial.value = range;
		}
	
	
	//console.log("range: " + range);
	
});

dial.draw();
