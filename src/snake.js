document.onkeydown = function (event) {
    if (event.keyCode === 37) {
        if (mainSnake.directionWay() !== "RIGHT")
            mainSnake.move("LEFT");
    }
    if (event.keyCode === 38) {
        if (mainSnake.directionWay() !== "DOWN")
            mainSnake.move("UP");
    }
    if (event.keyCode === 39) {
        if (mainSnake.directionWay() !== "LEFT")
            mainSnake.move("RIGHT");
    }
    if (event.keyCode === 40) {
        if (mainSnake.directionWay() !== "UP")
            mainSnake.move("DOWN");
    }

}
var xsy = document.getElementById("XSY");
var xfy = document.getElementById("XFY");
var mainSnake = new Snake(100, 100);

var aiSnake = new AI_snake();
var food = generateFood();
mainSnake.drawSnake();

food.drawFood();
var game = setInterval(function () {

    if (food === undefined) {
        food = generateFood();
    }
    if (checkPositions(food, mainSnake)) {
        food = undefined;
        mainSnake.pushBody();
    }
    if (mainSnake.directionWay() !== 'Nowhere') {
        mainSnake.changePosition();

        ctx.clearRect(0, 0, 800, 500);
        mainSnake.drawSnake();

        //thirdSnake.drawSnake();
        if (food !== undefined) {
            food.drawFood();
        }

    }

    aiSnake.setSnakeDirection(mainSnake, food);


    ctx.fillStyle = "#ff0000";
    ctx.font = "italic 30pt Arial";
    ctx.fillText("Счет: " + mainSnake.getSnakeLength().length, 10, 30);

}, 1000 / 20);
