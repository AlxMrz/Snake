export default class snakeBody {
    constructor(x1, y1, ctx) {
      this.x = x1;
      this.y = y1;
      this.ctx = ctx;
      this.width = 10;
      this.height = 10;
      this.bodyColor = 'green';
      this.strokeStyle = 'black';
    }

    setColor (color) {
        this.bodyColor = color;
    };
    
    drawBody (position = null) {
        
        this.ctx.strokeStyle = this.strokeStyle;
        if (position === 0) {
           this.ctx.fillStyle = "red";
        } else {
          this.ctx.fillStyle = this.bodyColor;
        }
        
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
}
