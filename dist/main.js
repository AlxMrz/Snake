/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Food;
/**
 * Класс "Еды"
 * @constructor
 */
function Food(ctx) {
  this.ctx = ctx;
  /**
   * Значение координаты x
   */
  this.x;
  /**
   * Значение координаты y
   */
  this.y;
  /**
   * Установить значение координат еды
   * @param x1
   * @param y1
   */
  this.setFoodCoord = function (x1, y1) {
    this.x = x1;
    this.y = y1;
  };
  /**
   * Прорисовка еды на холсте
   */
  this.drawFood = function () {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.x, this.y, 10, 10);
  };
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Application__ = __webpack_require__(2);

(new __WEBPACK_IMPORTED_MODULE_0__Application__["a" /* default */]()).main();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Snake__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AISnake__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Food__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__functions_js__ = __webpack_require__(6);





class Application {
  main() {

    document.onkeydown = function (event) {
        if (event.keyCode === 37) {
            if (mainSnake.directionWay() !== "RIGHT") mainSnake.move("LEFT");
        }
        if (event.keyCode === 38) {
            if (mainSnake.directionWay() !== "DOWN") mainSnake.move("UP");
        }
        if (event.keyCode === 39) {
            if (mainSnake.directionWay() !== "LEFT") mainSnake.move("RIGHT");
        }
        if (event.keyCode === 40) {
            if (mainSnake.directionWay() !== "UP") mainSnake.move("DOWN");
        }
    };
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var xsy = document.getElementById("XSY");
    var xfy = document.getElementById("XFY");
    var mainSnake = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](100, 100, ctx);

    var aiSnake = new __WEBPACK_IMPORTED_MODULE_1__AISnake__["a" /* default */]();
    var food = Object(__WEBPACK_IMPORTED_MODULE_3__functions_js__["b" /* generateFood */])(ctx);
    mainSnake.drawSnake();

    food.drawFood();
    var game = setInterval(function () {

        if (food === undefined) {
            food = Object(__WEBPACK_IMPORTED_MODULE_3__functions_js__["b" /* generateFood */])(ctx);
        }

          aiSnake.setSnakeDirection(mainSnake, food);
        
        if (Object(__WEBPACK_IMPORTED_MODULE_3__functions_js__["a" /* checkPositions */])(food, mainSnake)) {
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



        ctx.fillStyle = "#ff0000";
        ctx.font = "italic 30pt Arial";
        ctx.fillText("Счет: " + mainSnake.getSnakeLength().length, 10, 30);
    }, 1000 / 20);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Application;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Snake;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SnakeBody__ = __webpack_require__(4);


function Snake(x, y, ctx) {
    var x = x;
    var y = y;
    this.ctx = ctx;
    var direction = 'Nowhere';
    var snakeColor = 'green';
    var snakeLength = new Array(new __WEBPACK_IMPORTED_MODULE_0__SnakeBody__["a" /* default */](x, y, this.ctx), new __WEBPACK_IMPORTED_MODULE_0__SnakeBody__["a" /* default */](x - 10, y, this.ctx), new __WEBPACK_IMPORTED_MODULE_0__SnakeBody__["a" /* default */](x - 20, y, this.ctx));
    this.pushBody = function () {
        snakeLength.push(new __WEBPACK_IMPORTED_MODULE_0__SnakeBody__["a" /* default */](snakeLength[snakeLength.length - 1].x, snakeLength[snakeLength.length - 1].y, this.ctx));
    };
    this.move = function (whereToGo) {
        direction = whereToGo;
    };
    this.setPosition = function (x1, y1) {
        x = x1;
        y = y1;
    };
    this.showCoordinates = function () {
        return [x, y];
    };
    this.directionWay = function () {
        return direction;
    };
    this.getSnakeFirstBody = function () {
        return snakeLength[0];
    };
    this.getSnakeLength = function () {
        return snakeLength;
    };
    this.setColor = function (color) {
        snakeColor = color;
    };
    this.checkHealth = function () {
        for (var count = 1; count < snakeLength.length; count++) {
            if (snakeLength[0].x === snakeLength[count].x && snakeLength[0].y === snakeLength[count].y) {

                return true;
            }
        }
    };
    this.changePosition = function () {
        if (direction === "LEFT") {
            var snlen = snakeLength.length;
            for (var count = 1; count <= snlen; count++) {
                if (count === snlen) {
                    snakeLength[0].x -= 10;
                    continue;
                }
                snakeLength[snlen - count].y = snakeLength[snlen - count - 1].y;
                snakeLength[snlen - count].x = snakeLength[snlen - count - 1].x;
            }
        }
        if (direction === "UP") {
            var snlen = snakeLength.length;
            for (var count = 1; count <= snlen; count++) {
                if (count === snlen) {
                    snakeLength[0].y -= 10;
                    continue;
                }
                snakeLength[snlen - count].y = snakeLength[snlen - count - 1].y;
                snakeLength[snlen - count].x = snakeLength[snlen - count - 1].x;
            }
        }
        if (direction === "RIGHT") {
            var snlen = snakeLength.length;
            for (var count = 1; count <= snlen; count++) {
                if (count === snlen) {
                    snakeLength[0].x += 10;
                    continue;
                }
                snakeLength[snlen - count].y = snakeLength[snlen - count - 1].y;
                snakeLength[snlen - count].x = snakeLength[snlen - count - 1].x;
            }
        }
        if (direction === "DOWN") {
            var snlen = snakeLength.length;
            for (var count = 1; count <= snlen; count++) {
                if (count === snlen) {
                    snakeLength[0].y += 10;
                    continue;
                }
                snakeLength[snlen - count].y = snakeLength[snlen - count - 1].y;
                snakeLength[snlen - count].x = snakeLength[snlen - count - 1].x;
            }
        }

        if (snakeLength[0].x < 0) snakeLength[0].x = 790;
        if (snakeLength[0].y < 0) snakeLength[0].y = 490;
        if (snakeLength[0].x > 790) snakeLength[0].x = 0;
        if (snakeLength[0].y > 490) snakeLength[0].y = 0;
    };
    this.drawSnake = function () {
        for (var count = 0, x1 = 0, y1 = 0; count < snakeLength.length; count++, x1 - 10, y1 - 10) {
            snakeLength[count].drawBody();
        }
    };
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = snakeBody;
function snakeBody(x1, y1, ctx) {
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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = AI_snake;
/**
 * Класс искуственного интеллекта змейки.
 * @constructor
 */
function AI_snake() {
    /**
     * Взята ли змейка под контроль игрока
     * @type {boolean}
     */
    var underControll = false;
    /**
     * Массив змеек
     * @type {Array}
     */
    var snakes = new Array();
    /**
     * Отправляет змейку под контроль игрока
     * @param snake
     * @return void
     */
    this.getControll = function (snake) {
        this.underControll = true;
    };
    /**
     * Устанавливает направление змейки. Вызывается каждый кадр
     * @param snake Объект змейки
     * @param food Объект еды
     */
    this.setSnakeDirection = function (snake, food) {

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


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = generateFood;
/* harmony export (immutable) */ __webpack_exports__["a"] = checkPositions;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Food__ = __webpack_require__(0);


function generateFood(ctx) {
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

    var food = new __WEBPACK_IMPORTED_MODULE_0__Food__["a" /* default */](ctx);
    food.setFoodCoord(randomX, randomY);
    return food;
}
function checkPositions(food1, snake) {
    if (food1.x === snake.getSnakeLength()[0].x && food1.y === snake.getSnakeLength()[0].y) return true;else {
        return false;
    }
}


/***/ })
/******/ ]);