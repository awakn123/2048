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
      return;
    }
    let action = this.getAction();
    if (action === null) {
      console.log("Fail to generation Action");
      status.pause();
      return;
    }
    window.gameManager.move(action);
    setTimeout(() => this.moveToNext(), window.config.waitTime);
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

