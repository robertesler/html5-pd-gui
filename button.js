
function Button (canvas, ctx, scale, lineColor, pressColor, font, lineWidth) {
    
    this.canvas = canvas;
    this.ctx = ctx;
    this.scale = scale;
    this.lineColor = lineColor;
    this.pressColor = pressColor;
    this.font = font;
    this.lineWidth = lineWidth;
    this.mouseIsDown = false;
    this.obj = {};
    this.radius = this.canvas.width*.5 - this.lineWidth;
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
    
}

Button.prototype.draw = function () {
   // the circle
  this.ctx.save();
  this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
  this.ctx.scale(this.scale,this.scale);
  this.ctx.lineWidth = this.lineWidth;
  this.ctx.beginPath(); 
  this.ctx.strokeStyle = this.lineColor;
  this.ctx.arc(0,0,this.radius, 0, 2*Math.PI);
  this.ctx.stroke();
  this.ctx.restore(); 
  this.ctx.closePath();
    
    if(this.mouseIsDown)
      {
          this.ctx.fillStyle = this.pressColor;
          this.ctx.fill();
         
      }
    else 
      {
        this.ctx.fillStyle = this.lineColor;
        this.ctx.fill();
      }
    this.ctx.beginPath()  
    this.ctx.rect(0,0, this.canvas.width, this.canvas.height);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.closePath();
    this.ctx.stroke();
    
};

Button.prototype.drawButton = function() {
    this.draw();    
	this.obj = window.requestAnimationFrame(this.drawButton.bind(this));
};

Button.prototype.mouseDown = function() {
    //console.log("mousedown");
    this.mouseIsDown = true;  
	this.obj = window.requestAnimationFrame(this.drawButton.bind(this));
};

Button.prototype.mouseUp = function() {
    //console.log("mouseup");
    this.mouseIsDown = false;
};

