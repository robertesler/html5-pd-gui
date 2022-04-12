//My Constructor
function Dial (canvas, ctx, scale, rName, circleColor, dialColor, font, lineWidth) {
    
  this.canvas = canvas;
  this.ctx = ctx;
  this.obj= {}; 
  this.tick = 137;
  this.mouseIsDown = false;
    
  this.radius = this.canvas.width*.8;
  this.scale = scale;
  this.rName = rName;//receive name in pd patch
  this.circleColor = circleColor; //'#325FA2';
  this.dialColor = dialColor; //'#D40000';
  this.font = font; //"24px Arial";
  this.circleLineWidth = lineWidth; //10;
  this.value = 0; //0;   
    
  this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
  this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
  this.canvas.addEventListener("mousemove", this.mouseMove.bind(this, this.rName));
  
}

//my functions
Dial.prototype.draw = function() {

  //the circle
  this.ctx.save();
  this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
  this.ctx.scale(this.scale,this.scale);
  //ctx.rotate(-Math.PI/180);
  this.ctx.fillStyle = "white";
  this.ctx.lineWidth = 8;
  this.ctx.lineCap = "round";
  
  // The needle
  this.ctx.save();
  this.ctx.rotate(this.tick * Math.PI/180);
  this.ctx.strokeStyle = this.dialColor;
  this.ctx.fillStyle = this.dialColor;
  this.ctx.lineWidth = this.circleLineWidth;
  this.ctx.beginPath();
  this.ctx.moveTo(0,0);
  this.ctx.lineTo(this.radius-2,0);
  this.ctx.closePath();//this was the trick
  this.ctx.stroke();
  this.ctx.fill();
  this.ctx.restore();

  //blue border
  this.ctx.beginPath();
  this.ctx.lineWidth = 14;
  this.ctx.strokeStyle = this.circleColor;
  this.ctx.arc(0,0,this.radius, 2.4, 7, false);
  this.ctx.stroke();
  this.ctx.restore();  
  //the numbers
  this.ctx.font = this.font;
  this.ctx.fillText(Math.round(this.value), this.canvas.width*.45, this.canvas.height*.9);
   
};

Dial.prototype.drawDial = function () {
   // console.log("drawDial" + this);
    this.draw();    
	this.obj = window.requestAnimationFrame(this.drawDial.bind(this));
};

Dial.prototype.mouseDown = function () {
    this.obj = window.requestAnimationFrame(this.drawDial.bind(this));
	this.mouseIsDown = true;
};

Dial.prototype.mouseUp = function() {
	this.mouseIsDown = false;
};

Dial.prototype.mouseMove = function(e, rName) {
	
	var rect = this.canvas.getBoundingClientRect();
    var X = e.clientX - rect.left;
	var Y = e.clientY - rect.top;
	
    //console.log("x: " + X + " | y: " + Y);
    
	var leftSide = this.canvas.width/2 - (this.radius * this.scale) + this.circleLineWidth;
	var rightSide = this.canvas.width/2 + (this.radius * this.scale) + this.circleLineWidth;
	var top = this.canvas.height/2 - (this.radius * this.scale) + this.circleLineWidth;
	var bottom = this.canvas.height/2 + (this.radius * this.scale) + this.circleLineWidth;
		
	X -= leftSide;
	//Y -= top;
	Y = Y - bottom;
	Y *= -1;
	
	X = X - (this.radius * this.scale);
	Y = Y - (this.radius * this.scale);
	
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
	
	if(this.mouseIsDown && adjustment < 263)
		{
			this.tick = angle;
			var range = adjustment/263;
			range *= 100;
			this.value = range;
		}
    //console.log(this.value);
    //window.plugin.pd.sendFloat(rName, this.value);
};

