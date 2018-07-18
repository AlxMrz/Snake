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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Scene__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EventRegister__ = __webpack_require__(7);




(new __WEBPACK_IMPORTED_MODULE_0__Application__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_1__Scene__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_2__EventRegister__["a" /* default */]())).main();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Application {
  
  constructor(scene, eventRegister) {
    this.scene = scene;
    this.eventRegister = eventRegister;
  }

  main() {
    this.eventRegister.registerAllEvents();
    this.eventRegister.setScene(this.scene);
    this.scene.init();
    this.game();
  }

  game() {
    this.scene.show();
    this.eventRegister.resetEventsData();
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Player__ = __webpack_require__(8);





class Scene {
  constructor() {
    this.canvas = document.getElementById( "myCanvas" );
    this.ctx = this.canvas.getContext( "2d" );
    this.xsy = document.getElementById( "XSY" );
    this.xfy = document.getElementById( "XFY" );
    this.start = false;
  }

  init() {
    this.player = new __WEBPACK_IMPORTED_MODULE_3__Player__["a" /* default */]();
    this.mainSnake = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */]( 100, 100, this.ctx );
    this.secondSnake = new __WEBPACK_IMPORTED_MODULE_0__Snake__["a" /* default */]( 200, 100, this.ctx );
    this.aiSnake = new __WEBPACK_IMPORTED_MODULE_1__AISnake__["a" /* default */]();
    this.food = this.generateFood( this.ctx );
    this.printSceneObjects();
  }

  show() {
    if ( this.start ) {
      this.clearCanvas();
      this.makeFoodIfNotExist();
      
      this.processSnakeActions(this.mainSnake, 'player');
      this.processSnakeActions(this.secondSnake, 'short');
      
      this.printSceneObjects();
    }

  }

  processSnakeActions(snake, alg) {
    if(this.food === undefined) return;
    if (alg === 'player') {
      this.player.changeSnakeDirection(snake, this.keydown );
    } else if(alg === 'short') {
      this.aiSnake.shortAlgorithm(snake, this.food );
    } else {
      this.aiSnake.forwardAlgorithm(snake, this.food );
    }
    this.increaseSnakeBodyIfFoodEaten(snake);
    snake.moveIfDirectionWayExist();
  }
  
  printSceneObjects() {
    this.drawFoodIfExist();
    this.mainSnake.drawSnake();
    this.secondSnake.drawSnake();
    this.printScore();
  }
  
  clearCanvas() {
    this.ctx.clearRect( 0, 0, 800, 500 );
  }

  makeFoodIfNotExist() {
    if ( this.food === undefined ) {
      this.food = this.generateFood( this.ctx );
    }
  }

  increaseSnakeBodyIfFoodEaten(snake) {
    if ( this.checkPositions( this.food, snake ) ) {
      this.food = undefined;
      snake.pushBody();
    }
  }

  drawFoodIfExist() {
    if ( this.food !== undefined ) {
      this.food.drawFood();
    }
  }

  printScore() {
    this.ctx.fillStyle = "#ff0000";
    this.ctx.font = "italic 12pt Arial";
    this.ctx.fillText( "Счет игрока: " + this.mainSnake.getSnakeLength().length,5, 15 );
    this.ctx.fillText( "Счет компьютера 1: " + this.secondSnake.getSnakeLength().length, 5, 30 );
  }

  generateFood( ctx ) {
    var randomX;
    var randomY;
    for ( var x = true; x !== false; ) {
      randomX = Math.round( Math.random() * 790 );
      randomY = Math.round( Math.random() * 490 );
      if ( randomX % 10 !== 0 || randomY % 10 !== 0 ) {
        continue;
      } else {
        x = false;
      }
    }

    var food = new __WEBPACK_IMPORTED_MODULE_2__Food__["a" /* default */]( ctx );
    food.setFoodCoord( randomX, randomY );
    return food;
  }

  checkPositions( food1, snake ) {
    if (food1 === undefined) return false;
    return food1.x === snake.getSnakeLength()[0].x
            && food1.y === snake.getSnakeLength()[0].y
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
      this.snakeBodyWidth = 10;
      this.snakeBodyHeight = 10;
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
        for (let count = 0, x1 = 0, y1 = 0; count < this.snakeLength.length; count++, x1 - 10, y1 - 10) {
            this.snakeLength[count].drawBody(count);
        }
    };
    
    moveIfDirectionWayExist() {
      if ( this.directionWay() !== 'Nowhere' ) {
        this.changePosition();
      };
    }
    
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
      this.width = 10;
      this.height = 10;
      this.bodyColor = 'green';
      this.strokeStyle = 'black';
    }

    setColor (color) {
        this.bodyColor = color;
    };
    
    drawBody (position = null) {
        
        this.ctx.strokeStyle = this.strokeStyle;
        if (position === 0) {
           this.ctx.fillStyle = "red";
        } else {
          this.ctx.fillStyle = this.bodyColor;
        }
        
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
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
  
  setScene(scene) {
    this.scene = scene;
  }
  
    registerAllEvents() {
    this.registerKeyDown();
    this.registerOnClickState();
  }
  
  registerOnClickState() {
    let start = document.getElementById('state');
    start.onclick = function (event) {
      let state = document.getElementById('state');
      let currentState = state.getAttribute('data-current');
      
      if(currentState === "false") {
        state.setAttribute('data-current', true); 
        stateimage.src = 'images/stop.png';
        this.scene.start = true;
      } else {
        state.setAttribute('data-current', false); 
        stateimage.src = 'images/start.png';
        this.scene.start = false;
      }
    }.bind(this);
  }

  registerKeyDown() {
    document.onkeydown = function (event) {
      switch(event.keyCode) {
        case 37:
          this.keydown = "LEFT";
          break;
        case 38:
          this.keydown = "UP";
          break;
        case 39:
          this.keydown = "RIGHT";
          break;
        case 40:
          this.keydown = "DOWN";
          break;
      }
      this.scene.keydown = this.keydown;
    }.bind(this);
  }

  resetEventsData() {
    this.keydown = undefined;
    //this.scene.keydown = 'nowhere';
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventRegister;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
  changeSnakeDirection(snake, key) {
    snake.move(key);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;




/***/ })
/******/ ]);