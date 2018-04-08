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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Application__ = __webpack_require__(1);

(new __WEBPACK_IMPORTED_MODULE_0__Application__["a" /* default */]()).main();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scene__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventRegister__ = __webpack_require__(7);



class Application {
  constructor() {

  }
  main() {
    this.eventRegister = new __WEBPACK_IMPORTED_MODULE_1__EventRegister__["a" /* default */]();
    this.eventRegister.registerAllEvents();
    this.scene = new __WEBPACK_IMPORTED_MODULE_0__Scene__["a" /* default */]();
    this.scene.init();
    this.game();
  }

  game() {
    this.scene.show();
    this.eventRegister.resetEventData();
    window.requestAnimationFrame(this.game.bind(this));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Application;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Snake__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AISnake__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Food__ = __webpack_require__(6);




class Scene {
  constructor() {

  }

  init() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.xsy = document.getElementById("XSY");
    this.xfy = document.getElementById("XFY");
    this.mainSnake = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */](100, 100, this.ctx);
    this.aiSnake = new __WEBPACK_IMPORTED_MODULE_1__AISnake__["a" /* default */]();
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

        //thirdSnake.drawSnake();
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

      var food = new __WEBPACK_IMPORTED_MODULE_2__Food__["a" /* default */](ctx);
      food.setFoodCoord(randomX, randomY);
      return food;
  }

   checkPositions(food1, snake) {
      if (food1.x === snake.getSnakeLength()[0].x && food1.y === snake.getSnakeLength()[0].y) return true;else {
          return false;
      }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scene;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SnakeBody__ = __webpack_require__(4);


class Snake {
    constructor(x, y, ctx) {
      this.x = x;
      this.y = y;
      this.ctx = ctx;
      this.direction = 'Nowhere';
      this.snakeColor = 'green';
      this.snakeLength = [
        new __WEBPACK_IMPORTED_MODULE_0__SnakeBody__["a" /* default */](this.x, this.y, this.ctx),
        new __WEBPACK_IMPORTED_MODULE_0__SnakeBody__["a" /* default */](this.x - 10, this.y, this.ctx),
        new __WEBPACK_IMPORTED_MODULE_0__SnakeBody__["a" /* default */](this.x - 20, this.y, this.ctx)
      ];
    }

    pushBody () {
        this.snakeLength.push(
          new __WEBPACK_IMPORTED_MODULE_0__SnakeBody__["a" /* default */](
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
            var snlen = this.snakeLength.length;
            for (var count = 1; count <= snlen; count++) {
                if (count === snlen) {
                    this.snakeLength[0].x -= 10;
                    continue;
                }
                this.snakeLength[snlen - count].y = this.snakeLength[snlen - count - 1].y;
                this.snakeLength[snlen - count].x = this.snakeLength[snlen - count - 1].x;
            }
        }
        if (this.direction === "UP") {
            var snlen = this.snakeLength.length;
            for (var count = 1; count <= snlen; count++) {
                if (count === snlen) {
                    this.snakeLength[0].y -= 10;
                    continue;
                }
                this.snakeLength[snlen - count].y = this.snakeLength[snlen - count - 1].y;
                this.snakeLength[snlen - count].x = this.snakeLength[snlen - count - 1].x;
            }
        }
        if (this.direction === "RIGHT") {
            var snlen = this.snakeLength.length;
            for (var count = 1; count <= snlen; count++) {
                if (count === snlen) {
                    this.snakeLength[0].x += 10;
                    continue;
                }
                this.snakeLength[snlen - count].y = this.snakeLength[snlen - count - 1].y;
                this.snakeLength[snlen - count].x = this.snakeLength[snlen - count - 1].x;
            }
        }
        if (this.direction === "DOWN") {
            var snlen = this.snakeLength.length;
            for (var count = 1; count <= snlen; count++) {
                if (count === snlen) {
                    this.snakeLength[0].y += 10;
                    continue;
                }
                this.snakeLength[snlen - count].y = this.snakeLength[snlen - count - 1].y;
                this.snakeLength[snlen - count].x = this.snakeLength[snlen - count - 1].x;
            }
        }

        if (this.snakeLength[0].x < 0) this.snakeLength[0].x = 790;
        if (this.snakeLength[0].y < 0) this.snakeLength[0].y = 490;
        if (this.snakeLength[0].x > 790) this.snakeLength[0].x = 0;
        if (this.snakeLength[0].y > 490) this.snakeLength[0].y = 0;
    };

    drawSnake () {
        for (var count = 0, x1 = 0, y1 = 0; count < this.snakeLength.length; count++, x1 - 10, y1 - 10) {
            this.snakeLength[count].drawBody();
        }
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Snake;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class snakeBody {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = snakeBody;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AISnake {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = AISnake;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Food {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Food;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class EventRegister {
  registerAllEvents() {
    this.registerKeyDown();
  }

  registerKeyDown() {
    document.onkeydown = function (event) {
        if (event.keyCode === 37) {
            this.keydown = "LEFT";
        }
        if (event.keyCode === 38) {
            this.keydown = "UP";
        }
        if (event.keyCode === 39) {
            this.keydown = "RIGHT";
        }
        if (event.keyCode === 40) {
            this.keydown = "DOWN";
        }
    };
  }

  resetEventData() {
    this.keydown = undefined;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventRegister;



/***/ })
/******/ ]);