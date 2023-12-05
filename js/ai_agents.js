/**
 * This file contains all agents implementation.
 */

class AbstractAgent {
  constructor() {
    this.name = "AbstractAgent";
    this.running = true;
  }

  getAction() {
    throw new Error("Not Implement");
  }

  moveToNext() {
    if (!this.running) {
      return false;
    }
    let action = this.getAction();
    if (action === null) {
      console.log("Fail to generation Action");
      status.pause();
      return;
    }
    window.gameManager.move(action);
    if (window.config.waitTime > 0) {
      setTimeout(() => this.moveToNext(), window.config.waitTime);
    } else {
      this.moveToNext();
    }
  }

  run() {
    this.running = true;
    this.moveToNext();
  }

  cancel() {
    this.running = false;
  }

}

class GoWestAgent extends AbstractAgent{
  constructor(props) {
    super(props);
    this.name = "Go West";
  }

  getAction() {
    return 3;
  }
}

