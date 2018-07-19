export default class EventRegister {
  
  setScene(scene) {
    this.scene = scene;
  }
  
    registerAllEvents() {
    this.registerKeyDown();
    this.registerOnClickState();
    this.registerOnClickRestart();
  }
  
  registerOnClickState() {
    let start = document.getElementById('state');
    start.onclick = function (event) {
      let state = document.getElementById('state');
      let currentState = state.getAttribute('data-current');
      
      if(currentState === "false") {
        state.setAttribute('data-current', true); 
        state.setAttribute('title', 'Stop game'); 
        stateimage.src = 'images/stop.png';
        this.scene.start = true;
      } else {
        state.setAttribute('data-current', false); 
        state.setAttribute('title', 'Start game'); 
        stateimage.src = 'images/start.png';
        this.scene.start = false;
      }
    }.bind(this);
  }
  
  registerOnClickRestart() {
    let restart = document.getElementById('restart');
    restart.onclick = function() {
      location.reload();
    }
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
