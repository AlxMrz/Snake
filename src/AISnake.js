export default class AISnake {
  constructor() {
    this.underControll = false;
    this.snakes = new Array();
  }

    /**
     * Отправляет змейку под контроль игрока
     * @param snake
     * @return void
     */
    getControll (snake) {
        this.underControll = true;
    };
    /**
     * Устанавливает направление змейки. Вызывается каждый кадр
     * @param snake Объект змейки
     * @param food Объект еды
     */
    setSnakeDirection (snake, food) {
        this.shortAlgorith(snake, food);
    };
    
    shortAlgorithm(snake, food) {
      var snakeHeadY = snake.getSnakeFirstBody().y;
      var snakeHeadX = snake.getSnakeFirstBody().x;
      
      if (snakeHeadY != food.y) {
            snake.move("DOWN");
        }
        if (snakeHeadX != food.x) {
            snake.move("RIGHT");
        }
    }
    
    forwardAlgorithm(snake, food) {
      var snakeHeadY = snake.getSnakeFirstBody().y;
        var snakeHeadX = snake.getSnakeFirstBody().x;

        if (snakeHeadY < food.y) {
            if (snake.directionWay() === "UP") {
                snake.move("LEFT");
                return;
            }
            snake.move("DOWN");
            return;
        }
        if (snakeHeadX < food.x) {
            if (snake.directionWay() === "LEFT") {
                snake.move("DOWN");
                return;
            }
            snake.move("RIGHT");

            return;
        }
        if (snakeHeadX > food.x) {
            if (snake.directionWay() === "RIGHT") {
                snake.move("UP");
                return;
            }
            snake.move("LEFT");
            return;
        }
        if (snakeHeadY > food.y) {
            if (snake.directionWay() === "DOWN") {
                snake.move("RIGHT");
                return;
            }
            snake.move("UP");
            return;
        }
    }
    
    makePerpendicularMovement() {

    }
}
