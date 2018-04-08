export default class snakeBody {
    constructor(x1, y1, ctx) {
      this.x = x1;
      this.y = y1;
      this.ctx = ctx;
      this.bodyColor = 'green';
    }

    setColor (color) {
        this.bodyColor = color;
    };
    drawBody () {
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = this.bodyColor;
        this.ctx.strokeRect(this.x, this.y, 10, 10);
        this.ctx.fillRect(this.x, this.y, 10, 10);
    };
}
