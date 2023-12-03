// Average Depth Limited Search Agent.
class ADLSAgent extends AbstractAgent {
  constructor(props) {
    super(props);
    this.name = 'ADLS';
    this.averageNum = 5;
    this.depthLimit = 5;
  }

  // Get the most frequent action after several tryings.
  getAction() {
    let bestAction = null, bestCnt = 0;
    for (let i = 0; i < this.averageNum; i++) {
      let dls = new DLSAgent();
      dls.depthLimit = this.depthLimit;
      let action = dls.getAction();
      if (bestCnt === 0) {
        bestAction = action;
        bestCnt++;
      } else if (action === bestAction) {
        bestCnt++;
      } else {
        bestCnt--;
      }
    }
    return bestAction;
  }

}