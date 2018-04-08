export default class EventRegister {
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
