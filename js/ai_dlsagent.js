// Class DLSAgent: Represents an agent that uses Depth-Limited Search (DLS)
class DLSAgent extends AbstractAgent{
  constructor(props) {
    super(props);
    this.name = "DLS"; // Setting the agent name as 'DLS'
    this.depthLimit = window.config.dlsDepth;
  }

  // getAction: Determines the next action for the agent
  getAction() {
    let sim = new SimulationGM(window.gameManager);
    if (sim.isGameTerminated()) // Check if the game is over
      return null;
    let bestAction = this.dls(0, sim, this.depthLimit); // Perform DLS to find the best action
    return bestAction;
  }

  // dls: Performs the Depth-Limited Search algorithm
  dls(depth, sim, limit) {
    // if the current depth equals the limit or game is over
    if (depth === limit || sim.isGameTerminated())
      return this.evaluate(sim); // Evaluate the simulation state
    let bestAction = null, bestScore = null;
    let self = this;
    [0, 1, 2, 3].map(function(action) { // Iterate over possible actions
      let nextSim = new SimulationGM(sim);
      let moved = self.simMove(nextSim, action); // Perform the move in the simulation
      if (!moved)
        return;
      let score = self.dls(depth + 1, nextSim, limit);
      if (score > bestScore) { // Update best score and action if current score is better
        bestScore = score;
        bestAction = action;
      }
    });
    // Return action at root, score otherwise
    return depth == 0 ? bestAction : bestScore;
  }

  // simMove: Performs a move in the simulation
  simMove(sim, action) {
    let moved = sim.moveInGrid(action);
    if (moved) {
      sim.addRandomTile();//Could change to other way, for example, the miniMax.
      if (!sim.movesAvailable()) {
        sim.over = true; // Game over!
      }
    }
    return moved;
  }

  // evaluate: Returns the score of the simulation state
  evaluate(sim) {
    return sim.score;
  }

}