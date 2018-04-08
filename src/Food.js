export default class Food {
  constructor(ctx) {
    this.ctx = ctx;
    this.x;
    this.y;
  }

  setFoodCoord (x1, y1) {
    this.x = x1;
    this.y = y1;
  }

  drawFood () {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.x, this.y, 10, 10);
  }
}
