// Class BFSAgent: Represents an agent that uses Breadth-First Search (BFS)
class BFSAgent extends AbstractAgent {
  constructor(props) {
    super(props);
    this.name = 'BFS'; // Setting the agent name as 'BFS'
    this.maxDepth = 5; // Maximum depth limit
  }

  // getAction: Determines the next action for the agent
  getAction() {
    let queue = [{sim: new SimulationGM(window.gameManager), depth: 0}];
    let self = this; //

    let bestScore = 0, bestAction = null;
    while (queue.length > 0) {
      let {sim, depth, first} = queue.shift();
//           console.log(vertex);
      if (depth >= this.maxDepth) continue;

      // Add all unvisited neighbors to the queue
      [0, 1, 2, 3].map(function(action) { // Iterate over possible actions
        let nextSim = new SimulationGM(sim);
        let moved = self.simMove(nextSim, action); // Perform the move in the simulation
        if (moved && !nextSim.isGameTerminated()) {
          if (typeof (first) === 'undefined') {
            first = action;
          }
          queue.push({sim: nextSim, depth: depth + 1, first});
          if (bestScore < nextSim.score) {
            bestScore = self.evaluate(nextSim);
            bestAction = first;
          }
        }
      });

    }

    return bestAction;
  }

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