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
        /**
         * @var int SY значение Y "головы" змейки
         */
        var SY = snake.getSnakeFirstBody().y;

        /**
         * @var int SX значение X "головы" змейки
         */
        var SX = snake.getSnakeFirstBody().x;

        if (SY < food.y) {
            if (snake.directionWay() === "UP") {
                snake.move("LEFT");
                return;
            }
            snake.move("DOWN");
            return;
        }
        if (SX < food.x) {
            if (snake.directionWay() === "LEFT") {
                snake.move("DOWN");
                return;
            }
            snake.move("RIGHT");

            return;
        }
        if (SX > food.x) {
            if (snake.directionWay() === "RIGHT") {
                snake.move("UP");
                return;
            }
            snake.move("LEFT");
            return;
        }
        if (SY > food.y) {
            if (snake.directionWay() === "DOWN") {
                snake.move("RIGHT");
                return;
            }
            snake.move("UP");
            return;
        }
    };
}
