export default class EventRegister {
  registerAllEvents() {
    this.registerKeyDown();
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
    };
  }

  resetEventsData() {
    this.keydown = undefined;
  }

}
