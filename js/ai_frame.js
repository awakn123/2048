/**
 * This file handles all UI operations on AI and the execution process before agent.
 */
function aiStatus() {
  this.status = -1;
  this.statusText = 'Select An Agent';
  this.buttonText = '';
  this.agent = {};
  this.statusContainer    = document.querySelector(".ai_status");
  this.buttonContainer    = document.querySelector(".ai_button");
}

aiStatus.prototype.apply = function() {
  this.statusContainer.textContent = this.statusText;
  this.buttonContainer.innerText = this.buttonText;
  if(this.buttonText === '') {
    this.buttonContainer.className = "ai_button hide";
  } else {
    this.buttonContainer.className = "ai_button";
  }
};

aiStatus.prototype.setAgent = function(agent) {
  this.agent = agent;
  this.status = 0;
  this.statusText = agent.name;
  this.buttonText = "Play";
  this.apply();
};

aiStatus.prototype.start = function() {
  this.status = 1;
  this.statusText = "Running " + this.agent.name;
  this.buttonText = "Pause";
  this.apply();
};

aiStatus.prototype.pause = function() {
  this.status = 0;
  this.statusText = "Pause " + this.agent.name;
  this.buttonText = "Play";
  this.apply();
};

const status = new aiStatus();
status.apply();

