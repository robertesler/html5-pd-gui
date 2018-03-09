function Toggle (canvas, ctx, scale, toggleColor, lineColor, font, lineWidth) {
    
    this.canvas = canvas;
    this.ctx = ctx;
    this.scale = scale;
    this.toggleColor = toggleColor;
    this.lineColor = lineColor;
    this.font = font;
    this.lineWidth = lineWidth;
   // console.log(this.ctx)
    this.obj = {};
    this.mouseIsDown = false;
    this.counter = 0;
    this.value = 1;
    
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
}

Toggle.prototype.draw = function (){
     
       this.ctx.beginPath();
       this.ctx.rect(this.lineWidth, this.lineWidth, (this.canvas.width-this.lineWidth*2)*this.scale, (this.canvas.height-this.lineWidth*2)*this.scale);
       this.ctx.fillStyle = this.toggleColor;
       this.ctx.fill();
       this.ctx.lineWidth = this.lineWidth;
       this.ctx.strokeStyle = this.lineColor;
       this.ctx.stroke();
    
        if(this.value == 1)
            {
                this.ctx.beginPath();
                this.ctx.moveTo(this.lineWidth, this.lineWidth);
                this.ctx.lineTo((this.canvas.width*this.scale)-this.lineWidth, (this.canvas.height*this.scale)-this.lineWidth);
                this.ctx.stroke();
                
                this.ctx.beginPath();
                this.ctx.moveTo(this.lineWidth, (this.canvas.height*this.scale)-this.lineWidth);
                this.ctx.lineTo((this.canvas.width*this.scale)-this.lineWidth, this.lineWidth);
                this.ctx.stroke();
            }
        
     
};

Toggle.prototype.drawToggle = function (){
    this.draw();
    this.obj = window.requestAnimationFrame(this.drawToggle.bind(this));
};

Toggle.prototype.mouseDown = function (){
     this.mouseIsDown = true;
     this.value++;
     this.value %= 2; 
    this.obj = window.requestAnimationFrame(this.drawToggle.bind(this));
};

Toggle.prototype.mouseUp = function (){
    this.mouseIsDown = false;
};
