export default class Application {
  
  constructor(scene, eventRegister) {
    this.scene = scene;
    this.eventRegister = eventRegister;
  }

  main() {
    this.eventRegister.registerAllEvents();
    this.scene.init();
    this.game();
  }

  game() {
    this.scene.show();
    this.eventRegister.resetEventsData();
    window.requestAnimationFrame(this.game.bind(this));
  }
}
