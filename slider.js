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
  this.width = width-lineWidth;
  this.height = height-lineWidth;
  this.axis = axis;
  this.sliderY = this.height-(this.height/10)+this.lineWidth;
  this.sliderX = this.lineWidth*2;
  this.mousePos = 0;
  this.value = 0;
    
  this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
  this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));     this.canvas.addEventListener("mousemove", this.mouseMove.bind(this, this.rName));
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
                this.ctx.moveTo(this.sliderX, 0);
                this.ctx.rect(this.sliderX-this.lineWidth, this.lineWidth, this.width/10, this.height);
                //console.log("horizontal");
            }
    
       this.ctx.fillStyle = this.sliderColor;
       this.ctx.fill();
       this.ctx.lineWidth = this.lineWidth;
       this.ctx.strokeStyle = this.lineColor;
       this.ctx.closePath();
       this.ctx.stroke();
       this.ctx.restore();
        //draw the number
       
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

Slider.prototype.mouseMove  = function (e, rName) {
    
    var rect = this.canvas.getBoundingClientRect();
    var X = e.clientX - rect.left;
	var Y = e.clientY - rect.top;
    
     //if vertical slider
   if(this.axis === 'v')  
       {
            this.mousePos = Y;
            var bottom = this.height-(this.height/10)+this.lineWidth;
            var top = this.lineWidth;
      
            if(Y < top)
            {
                this.mousePos = top;
            }
            else if(Y > bottom)
            {
                this.mousePos = bottom;
            }
    
            if(this.mouseIsDown)
            {
                this.value = (this.rangeHigh - Y);
                if(this.value >= this.rangeHigh)
                    this.value = this.rangeHigh;
                if(this.value <= this. rangeLow)
                    this.value = this.rangeLow;
            }
       }//if vertical
    
     //if horizontal slider
   if(this.axis === 'h')  
       {
            this.mousePos = X;
            var left = this.lineWidth*2;
            var right = this.width-(this.width/10)+this.lineWidth*2;
      
            if(X > right)
            {
                this.mousePos = right;
            }
            else if(X < left)
            {
                this.mousePos = left;
            }
    
            if(this.mouseIsDown)
            {
                this.value = X;
                if(this.value >= this.rangeHigh)
                    this.value = this.rangeHigh;
                if(this.value <= this. rangeLow)
                    this.value = this.rangeLow;
                //console.log(this.value);
            }
       }//if vertical
    
    //window.plugins.pd.sendFloat(rName, this.value);
};

