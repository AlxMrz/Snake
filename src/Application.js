export default class Application {
  
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
    this.scene.time = new Date();
    this.scene.show();
    this.scene.lastTime = this.time;
    this.eventRegister.resetEventsData();
    window.requestAnimationFrame(this.game.bind(this));
  }
}
