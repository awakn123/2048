/**
 * This file contains all agents implementation.
 */

class AbstractAgent {
  constructor() {
    this.name = "AbstractAgent";
    this.intervalIdx = 0;
  }

  getAction() {
    throw new Error("Not Implement");
  }

  moveToNext() {
    let action = this.getAction();
    if (action === null) {
      console.log("Fail to generation Action");
      status.pause();
      return;
    }
    window.gameManager.move(action);
  }

  run() {
    this.intervalIdx = setInterval(() => this.moveToNext(), 1000);
  }

  cancel() {
    clearInterval(this.intervalIdx);
    this.intervalIdx = 0;
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

