/**
 * This file handles all UI operations on AI and the execution process before agent.
 */
function aiStatus() {
  this.status = -1;
  this.statusText = 'Select An Agent';
  this.buttonText = '';
  this.agent = {};
  this.statusContainer = document.querySelector(".ai_status");
  this.buttonContainer = document.querySelector(".ai_control");
}

aiStatus.prototype.apply = function() {
  this.statusContainer.textContent = this.statusText;
  this.buttonContainer.innerText = this.buttonText;
  if(this.buttonText === '') {
    this.buttonContainer.className = "ai_button ai_control hide";
  } else {
    this.buttonContainer.className = "ai_button ai_control";
  }
};

aiStatus.prototype.setAgent = function(agent) {
  this.agent = agent;
  this.start();
  // this.status = 0;
  // this.statusText = agent.name;
  // this.buttonText = "Play";
  // this.apply();
};

aiStatus.prototype.start = function() {
  this.status = 1;
  this.statusText = "Running " + this.agent.name;
  this.buttonText = "Pause";
  this.apply();
  this.agent.run();
};

aiStatus.prototype.pause = function() {
  this.status = 0;
  this.statusText = "Pause " + this.agent.name;
  this.buttonText = "Play";
  this.apply();
  this.agent.cancel();
};

aiStatus.prototype.control = function() {
  if (this.status === -1) {
    alert("Please select an agent");
    return;
  }
  if (this.status === 0) {
    this.start();
  } else {
    this.pause();
  }
};


const status = new aiStatus();
status.apply();

const bindButtonPress = function (selector, fn) {
  let button = document.querySelector(selector);
  button.addEventListener("click", fn.bind(this));
  button.addEventListener("touchend", fn.bind(this));
};

(function(){
  bindButtonPress(".go-west", () => status.setAgent(new GoWestAgent()));
  bindButtonPress(".dls", () => status.setAgent(new DLSAgent()));
  bindButtonPress(".ai_control", () => status.control());
})();