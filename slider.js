//Constructor
function Slider (canvas, ctx, backgroundColor, sliderColor, rangeLow, rangeHigh, font, lineWidth, lineColor, width, height, axis){
    
  this.obj = {};  
  this.canvas = canvas;
  this.ctx = ctx;
  this.backgroundColor = backgroundColor;
  this.sliderColor = sliderColor;
  this.rangeLow = rangeLow;
  this.rangeHigh = rangeHigh;
  this.font = font;
  this.lineWidth = lineWidth;
  this.lineColor = lineColor;
  this.mouseIsDown = false;
  this.width = width;
  this.height = height;
  this.axis = axis;
  this.sliderY = this.height-(this.height/10)+this.lineWidth;
  this.mousePos;
    
  this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
  this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));   this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
}

//Methods
Slider.prototype.draw = function () {
       
       //draw the background
       this.ctx.beginPath();
       this.ctx.rect(0+this.lineWidth, 0+this.lineWidth, this.width, this.height);
       this.ctx.fillStyle = this.backgroundColor;
       this.ctx.fill();
       this.ctx.lineWidth = this.lineWidth;
       this.ctx.strokeStyle = this.lineColor;
       this.ctx.stroke();
    
       //mouse events
        if(this.mouseIsDown)
            {
                this.sliderY = this.mousePos;
            }
    
       //draw the slider
       this.ctx.save();
       this.ctx.beginPath();
       this.ctx.moveTo(0, this.sliderY);
       this.ctx.rect(0+this.lineWidth, this.sliderY, this.width, this.height/10);
       this.ctx.fillStyle = this.sliderColor;
       this.ctx.fill();
       this.ctx.lineWidth = this.lineWidth;
       this.ctx.strokeStyle = this.lineColor;
       this.ctx.closePath();
       this.ctx.stroke();
       this.ctx.restore();
        //draw the number
//        this.ctx.font = this.font;
//        this.strokeStyle = '#000000';
//        this.ctx.fillText(Math.round(this.value), this.canvas.width*.45, this.canvas.height*.9);
};

Slider.prototype.drawSlider  = function () {
   this.draw();
   this.obj = window.requestAnimationFrame(this.drawSlider.bind(this)); 
};

Slider.prototype.mouseDown  = function () {
    this.mouseIsDown = true;
    this.obj = window.requestAnimationFrame(this.drawSlider.bind(this));
};

Slider.prototype.mouseUp  = function () {
    
    this.mouseIsDown = false;
};

Slider.prototype.mouseMove  = function (e) {
    
    var rect = this.canvas.getBoundingClientRect();
    //var X = e.clientX - rect.left;
	var Y = e.clientY - rect.top;
    var bottom = this.height-(this.height/10)+this.lineWidth;
    var top = this.lineWidth;
     this.mousePos = Y;
    
    this.value = Y; 
    if(Y < top)
        {
            this.mousePos = top;
        }
    else if(Y > bottom)
        {
            this.mousePos = bottom;
        }
    
    //console.log("pos: " + Y);
};

