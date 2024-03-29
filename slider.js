//Constructor
function Slider (canvas, ctx, rName, backgroundColor, sliderColor, rangeLow, rangeHigh, font, lineWidth, lineColor, width, height, axis){
    
  this.obj = {};  
  this.canvas = canvas;
  this.ctx = ctx;
  this.rName = rName;
  this.backgroundColor = backgroundColor;
  this.sliderColor = sliderColor;
  this.rangeLow = rangeLow;
  this.rangeHigh = rangeHigh;
  this.font = font;
  this.lineWidth = lineWidth;
  this.lineColor = lineColor;
  this.mouseIsDown = false;
  this.touchIsStarted = false;
  this.width = width-lineWidth;
  this.height = height-lineWidth;
  this.axis = axis;
  this.sliderY = this.height-(this.height/10)+this.lineWidth;
  this.sliderX = this.lineWidth*2;
  this.mousePos = 0;
  this.X = 0;
  this.Y = this.height;
  this.value = 0;
    
  this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
  this.canvas.addEventListener("touchstart", this.touchStart.bind(this));
  this.canvas.addEventListener("touchend", this.mouseUp.bind(this));
  this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
  this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
  this.canvas.addEventListener("touchmove", this.mouseMove.bind(this));
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
       
    
       //draw the slider
       this.ctx.save();
       this.ctx.beginPath();
       
        if(this.axis === 'v')
            {
                //mouse events
                if(this.mouseIsDown)
                {
                    this.sliderY = this.mousePos;
                }
                //touch events
                if(this.touchIsStarted)
                {
                    this.sliderY = this.mousePos;
                }
                this.ctx.moveTo(0, this.sliderY);
                this.ctx.rect(this.lineWidth, this.sliderY, this.width, this.height/10);
               
            }
        if(this.axis === 'h')
            {
                //mouse events
                if(this.mouseIsDown)
                {
                    this.sliderX = this.mousePos;
                }
                //touch events
                if(this.touchIsStarted)
                {
                    this.sliderX = this.mousePos;
                }     
                this.ctx.moveTo(this.sliderX, 0);
                this.ctx.rect(this.sliderX-this.lineWidth, this.lineWidth, this.width/10, this.height);
                
                //console.log("horizontal");
            }
       
       this.ctx.fillStyle = this.sliderColor;
       this.ctx.fill();
       this.ctx.lineWidth = this.lineWidth;
       this.ctx.strokeStyle = this.lineColor;
     //  this.ctx.closePath();
       this.ctx.stroke();
       this.ctx.restore();
      
       
};

Slider.prototype.drawSlider  = function () {
    this.draw();
    this.obj = window.requestAnimationFrame(this.drawSlider.bind(this));
};

Slider.prototype.mouseDown  = function () {
    this.obj = window.requestAnimationFrame(this.drawSlider.bind(this));
    this.mouseIsDown = true;
    if(this.axis === 'v')
        {
            this.mousePos = this.Y;
        }
    if(this.axis === 'h')
        {
            this.mousePos = this.X;
        }
};

Slider.prototype.touchStart = function () {
	this.obj = window.requestAnimationFrame(this.drawSlider.bind(this));
	this.touchIsStarted = true;	
};

Slider.prototype.mouseUp  = function () {
    this.touchIsStarted = false;
    this.mouseIsDown = false;
};

Slider.prototype.mouseMove  = function (e) {
    
    var rect = this.canvas.getBoundingClientRect();
   	var X;
	var Y;

	if(this.mouseIsDown)
	{
	  X = e.clientX - rect.left;
	  Y = e.clientY - rect.top;
      this.X = X;
      this.Y = Y;
	}
	
	if(this.touchIsStarted)
	{
	  X = e.touches[0].clientX - rect.left;
	  Y = e.touches[0].clientY - rect.top;
      this.X = X;
      this.Y = Y;
	}
    
     //if vertical slider
   if(this.axis === 'v')  
       {
            this.mousePos = this.Y;
            var bottom = this.height-(this.height/10)+this.lineWidth;
            var top = this.lineWidth;
        
            if(this.Y < top)
            {
                this.mousePos = top;
            }
            else if(this.Y > bottom)
            {
                this.mousePos = bottom;
            }

            if(this.mouseIsDown)
            {
                this.value = (this.rangeHigh - this.Y);
                if(this.value >= this.rangeHigh)
                    this.value = this.rangeHigh;
                if(this.value <= this. rangeLow)
                    this.value = this.rangeLow;
            }

	    if(this.touchIsStarted)
            {
                this.value = (this.rangeHigh - this.Y);
                if(this.value >= this.rangeHigh)
                    this.value = this.rangeHigh;
                if(this.value <= this. rangeLow)
                    this.value = this.rangeLow;
            }
       }//if vertical
    
     //if horizontal slider
   if(this.axis === 'h')  
       {
            this.mousePos = this.X;
            var left = this.lineWidth*2;
            var right = this.width-(this.width/10)+this.lineWidth*2;
      
            if(this.X > right)
            {
                this.mousePos = right;
            }
            else if(this.X < left)
            {
                this.mousePos = left;
            }
    
            if(this.mouseIsDown)
            {
                this.value = this.X;
                if(this.value >= this.rangeHigh)
                    this.value = this.rangeHigh;
                if(this.value <= this. rangeLow)
                    this.value = this.rangeLow;
                //console.log(this.value);
            }

	    if(this.touchIsStarted)
            {
                this.value = this.X;
                if(this.value >= this.rangeHigh)
                    this.value = this.rangeHigh;
                if(this.value <= this. rangeLow)
                    this.value = this.rangeLow;
                //console.log(this.value);
            }			
       }//if vertical
    
    //window.plugins.pd.sendFloat(this.rName, this.value);
};

