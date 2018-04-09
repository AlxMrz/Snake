import snakeBody from './SnakeBody';

export default class Snake {
    constructor(x, y, ctx) {
      this.x = x;
      this.y = y;
      this.ctx = ctx;
      this.snakeBodyWidth = 10;
      this.snakeBodyHeight = 10;
      this.direction = 'Nowhere';
      this.snakeColor = 'green';
      this.snakeLength = [
        new snakeBody(this.x, this.y, this.ctx),
        new snakeBody(this.x - 10, this.y, this.ctx),
        new snakeBody(this.x - 20, this.y, this.ctx)
      ];
    }

    pushBody () {
        this.snakeLength.push(
          new snakeBody(
            this.snakeLength[this.snakeLength.length - 1].x,
            this.snakeLength[this.snakeLength.length - 1].y,
            this.ctx)
          );
    };

    move (whereToGo) {
        this.direction = whereToGo;
    };

    setPosition (x1, y1) {
        this.x = x1;
        this.y = y1;
    };

    showCoordinates () {
        return [this.x, this.y];
    };

    directionWay () {
        return this.direction;
    };

    getSnakeFirstBody () {
        return this.snakeLength[0];
    };

    getSnakeLength () {
        return this.snakeLength;
    };

    setColor (color) {
        this.snakeColor = color;
    };

    checkHealth () {
        for (var count = 1; count < snakeLength.length; count++) {
            if (this.snakeLength[0].x === this.snakeLength[count].x && this.snakeLength[0].y === this.snakeLength[count].y) {
                return true;
            }
        }
    };

    changePosition () {
        if (this.direction === "LEFT") {
            this.moveAllBodies('x', this.snakeLength[0].x - this.snakeBodyWidth);
        } else if (this.direction === "UP") {
            this.moveAllBodies('y', this.snakeLength[0].y - this.snakeBodyHeight);
        } else if (this.direction === "RIGHT") {
            this.moveAllBodies('x', this.snakeLength[0].x + this.snakeBodyWidth);
        } else if (this.direction === "DOWN") {
            this.moveAllBodies('y', this.snakeLength[0].y + this.snakeBodyHeight);
        }
        this.moveSnakeHeadToParallelBoardIfNeeded();
    };

    moveAllBodies(snakeCoord, value) {
      var snlen = this.snakeLength.length;
      for (var count = 1; count <= snlen; count++) {
          if (count === snlen) {
              if(snakeCoord === 'x') {
                this.snakeLength[0].x = value;
              } else if(snakeCoord === 'y') {
                this.snakeLength[0].y = value;
              }
              continue;
          }
          this.snakeLength[snlen - count].y = this.snakeLength[snlen - count - 1].y;
          this.snakeLength[snlen - count].x = this.snakeLength[snlen - count - 1].x;
      }
    }

    moveSnakeHeadToParallelBoardIfNeeded() {
      if (this.snakeLength[0].x < 0) this.snakeLength[0].x = 790;
      if (this.snakeLength[0].y < 0) this.snakeLength[0].y = 490;
      if (this.snakeLength[0].x > 790) this.snakeLength[0].x = 0;
      if (this.snakeLength[0].y > 490) this.snakeLength[0].y = 0;
    }
    
    drawSnake () {
        for (var count = 0, x1 = 0, y1 = 0; count < this.snakeLength.length; count++, x1 - 10, y1 - 10) {
            this.snakeLength[count].drawBody();
        }
    };
}
