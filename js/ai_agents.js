/**
 * This file contains all agents implementation.
 */
console.log("AI agents");

class AbstractAgent {
  constructor() {
    this.name = "AbstractAgent";
  }

}

class GoWestAgent extends AbstractAgent{
  constructor(props) {
    super(props);
    this.name = "Go West";
  }

}

class DFSAgent extends AbstractAgent{
  constructor() {
    super();
    this.name = "DFS";
  }
}