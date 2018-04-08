import Snake from './Snake';
import AISnake from './AISnake';
import Food from './Food'

export default class Scene {
  constructor() {

  }

  init() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.xsy = document.getElementById("XSY");
    this.xfy = document.getElementById("XFY");
    this.mainSnake = new Snake(100, 100, this.ctx);
    this.aiSnake = new AISnake();
    this.food = this.generateFood(this.ctx);
    this.mainSnake.drawSnake();
    this.food.drawFood();
  }

  show() {

    if (this.food === undefined) {
        this.food = this.generateFood(this.ctx);
    }

      this.aiSnake.setSnakeDirection(this.mainSnake, this.food);

    if (this.checkPositions(this.food, this.mainSnake)) {
        this.food = undefined;
        this.mainSnake.pushBody();
    }
    if (this.mainSnake.directionWay() !== 'Nowhere') {
        this.mainSnake.changePosition();

        this.ctx.clearRect(0, 0, 800, 500);
        this.mainSnake.drawSnake();

        if (this.food !== undefined) {
            this.food.drawFood();
        }
    }



    this.ctx.fillStyle = "#ff0000";
    this.ctx.font = "italic 30pt Arial";
    this.ctx.fillText("Счет: " + this.mainSnake.getSnakeLength().length, 10, 30);
  }
  
   generateFood(ctx) {
      var randomX;
      var randomY;
      for (var x = true; x !== false;) {
          randomX = Math.round(Math.random() * 790);
          randomY = Math.round(Math.random() * 490);
          if (randomX % 10 !== 0 || randomY % 10 !== 0) continue;else {
              x = false;
          }
          ;
      }

      var food = new Food(ctx);
      food.setFoodCoord(randomX, randomY);
      return food;
  }

   checkPositions(food1, snake) {
      if (food1.x === snake.getSnakeLength()[0].x && food1.y === snake.getSnakeLength()[0].y) return true;else {
          return false;
      }
  }
}
