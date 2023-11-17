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
    if (!action)
      return;
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

class DLSAgent extends AbstractAgent{
  constructor(props) {
    super(props);
    this.name = "DLS";
  }

  getAction() {
    let sim = new SimulationGM(window.gameManager);
    if (sim.isGameTerminated())
      return null;
    let bestAction = this.dls(0, sim, 3);
    return bestAction;
  }

  dls(depth, sim, limit) {
    if (depth === limit || sim.isGameTerminated())
      return this.evaluate(sim);
    let bestAction = null, bestScore = null;
    let self = this;
    [0, 1, 2, 3].map(function(action) {
      let nextSim = new SimulationGM(sim);
      self.simMove(nextSim, action);
      let score = self.dls(depth + 1, nextSim, limit);
      if (score > bestScore) {
        bestScore = score;
        bestAction = action;
      }
    });
    return depth == 0 ? bestAction : bestScore;
  }

  simMove(sim, action) {
    let moved = sim.moveInGrid(action);
    if (moved) {
      sim.addRandomTile();//Could change to other way, for example, the miniMax.
      if (!sim.movesAvailable()) {
        sim.over = true; // Game over!
      }
    }
  }

  evaluate(sim) {
    return sim.score;
  }

}