import Snake from './Snake';
import AISnake from './AISnake';
import Food from './Food';
import Player from './Player';

export default class Scene {
  constructor() {
    this.canvas = document.getElementById( "myCanvas" );
    this.ctx = this.canvas.getContext( "2d" );
    this.xsy = document.getElementById( "XSY" );
    this.xfy = document.getElementById( "XFY" );
    this.start = false;
  }

  init() {
    this.player = new Player();
    this.mainSnake = new Snake( 100, 100, this.ctx );
    this.secondSnake = new Snake( 200, 100, this.ctx );
    this.aiSnake = new AISnake();
    this.food = this.generateFood( this.ctx );
    this.printSceneObjects();
  }

  show() {
    if ( this.start ) {
      this.clearCanvas();
      this.makeFoodIfNotExist();
      
      this.processSnakeActions(this.mainSnake, 'player');
      this.processSnakeActions(this.secondSnake, 'forward');
      
      this.printSceneObjects();
    }

  }

  processSnakeActions(snake, wayType) {
    if(this.food === undefined) return;
    
    this.changeSnakeDirection(snake, wayType);
    this.increaseSnakeBodyIfFoodEaten(snake);
  }
  
  changeSnakeDirection(snake, wayType) {
    let updateTime = this.getSnakeUpdateTime(snake);
    let currentDiff = Math.abs(this.time.getMilliseconds() - snake.updateTime.getMilliseconds());
    
    if ( currentDiff > updateTime ) {
      if (wayType === 'player') {
        this.player.changeSnakeDirection(snake, this.keydown );
      } else if(wayType === 'short') {
        this.aiSnake.shortAlgorithm(snake, this.food );
      } else {
        this.aiSnake.forwardAlgorithm(snake, this.food );
      }
      snake.updateTime = this.time;
      snake.moveIfDirectionWayExist();
    }
  }
  
  getSnakeUpdateTime(snake) {
    let updateTime = 0;
    let snakeLength = snake.getSnakeLength().length;
    if(snakeLength < 30) updateTime = 1000/30;
    if(snakeLength < 25) updateTime = 1000/25;
    if(snakeLength < 20) updateTime = 1000/20;
    if(snakeLength < 15) updateTime = 1000/15;
    if(snakeLength < 10) updateTime = 1000/10;
    if(snakeLength < 5) updateTime = 1000/5;
    return updateTime;
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
    this.ctx.fillText( "Your score: " + this.mainSnake.getSnakeLength().length,5, 15 );
    this.ctx.fillText( "AI score: " + this.secondSnake.getSnakeLength().length, 5, 30 );
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

    var food = new Food( ctx );
    food.setFoodCoord( randomX, randomY );
    return food;
  }

  checkPositions( food1, snake ) {
    if (food1 === undefined) return false;
    return food1.x === snake.getSnakeLength()[0].x
            && food1.y === snake.getSnakeLength()[0].y
  }
}
