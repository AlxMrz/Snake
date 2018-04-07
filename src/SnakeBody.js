export default function snakeBody(x1, y1, ctx) {
    this.x = x1;
    this.y = y1;
    this.ctx = ctx;
    var bodyColor = 'green';
    this.setColor = function (color) {
        bodyColor = color;
    };
    this.drawBody = function () {
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = bodyColor;
        this.ctx.strokeRect(this.x, this.y, 10, 10);
        this.ctx.fillRect(this.x, this.y, 10, 10);
    };
}
