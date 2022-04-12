
function Button (canvas, ctx, scale, rName, buttonColor, lineColor, pressColor, font, lineWidth) {
    
    this.canvas = canvas;
    this.ctx = ctx;
    this.scale = scale;
    this.rName = rName; //receive name in your pd patch
    this.lineColor = lineColor;
    this.buttonColor = buttonColor;
    this.pressColor = pressColor;
    this.font = font;
    this.lineWidth = lineWidth;
    this.mouseIsDown = false;
    this.obj = {};
    this.radius = (this.canvas.width*.5) - this.lineWidth;
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
    
}

Button.prototype.draw = function () {
      
        var rectX = (this.canvas.width/2)-(this.radius*this.scale);
        var rectY = (this.canvas.height/2)-(this.radius*this.scale);
       this.ctx.beginPath();
       this.ctx.rect(rectX, rectY, (this.canvas.width-this.lineWidth*2)*this.scale, (this.canvas.height-this.lineWidth*2)*this.scale);
       this.ctx.fillStyle = this.buttonColor;
       this.ctx.fill();
       this.ctx.lineWidth = this.lineWidth;
       this.ctx.strokeStyle = this.lineColor;
       this.ctx.stroke();
    
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width/2, this.canvas.height/2, this.radius*this.scale, 0, 2 * Math.PI, false);
      
      if(this.mouseIsDown)
          {
              this.ctx.fillStyle = this.pressColor;
              this.ctx.fill();
          }
        else
        {
             this.ctx.fillStyle = this.buttonColor;
              this.ctx.fill();
        }
     
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeStyle = this.lineColor;
      this.ctx.stroke();
    
};

Button.prototype.drawButton = function() {
    this.draw();    
	this.obj = window.requestAnimationFrame(this.drawButton.bind(this));
};

Button.prototype.mouseDown = function() {
    //console.log("mousedown = " + this.rName);
    this.mouseIsDown = true;  
	this.obj = window.requestAnimationFrame(this.drawButton.bind(this));
    //window.plugins.pd.sendBang(this.rName);
};

Button.prototype.mouseUp = function() {
    //console.log("mouseup");
    this.mouseIsDown = false;
};
