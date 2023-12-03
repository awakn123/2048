class ADLSAgent extends AbstractAgent {
  constructor(props) {
    super(props);
    this.name = "ADLS"; // Setting the agent name as 'DLS'
  }
  getAction() {
    let sim = new SimulationGM(window.gameManager);
    if (sim.isGameTerminated()) // Check if the game is over
      return null;
    // let bestAction = this.dls(0, sim, 3); // Perform DLS to find the best action
    // return bestAction;
    return 0;
  }

}