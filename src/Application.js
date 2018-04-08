import Scene from './Scene';
import EventRegister from './EventRegister';

export default class Application {
  constructor() {

  }
  main() {
    this.eventRegister = new EventRegister();
    this.eventRegister.registerAllEvents();
    this.scene = new Scene();
    this.scene.init();
    this.game();
  }

  game() {
    this.scene.show();
    this.eventRegister.resetEventData();
    window.requestAnimationFrame(this.game.bind(this));
  }
}
