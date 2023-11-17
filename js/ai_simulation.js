const TimeConsumer = function() {
  this.arr = [];
};
TimeConsumer.prototype.mark = function(name) {
  this.arr.push({name, t: new Date()});
};
TimeConsumer.prototype.print = function() {
  let prev = null;
  console.table(this.arr.map((item, idx)=> {
    let p = idx === 0 ? 0 : item.t - prev.t;
    prev = item;
    return {name: item.name, p};
  }));
};
TimeConsumer.prototype.clear = function() {
  this.arr = [];
}
const tc = new TimeConsumer();
const SimulationGM = function(gameManager) {
  this.size = gameManager.size;
  this.grid = new Grid(gameManager.grid.size, gameManager.grid.serialize().cells);
  this.score = gameManager.score;
  this.over = gameManager.over;
  this.won = gameManager.won;
  this.keepPlaying = gameManager.keepPlaying;

  let properties = Object.getOwnPropertyNames(GameManager.prototype);

  for (let property of properties) {
    if (property !== 'constructor') {
      let descriptor = Object.getOwnPropertyDescriptor(GameManager.prototype, property);
      Object.defineProperty(SimulationGM.prototype, property, descriptor);
    }
  }
};

SimulationGM.prototype.moveInGrid = function(direction) {
  // 0: up, 1: right, 2: down, 3: left
  var self = this;

  if (this.isGameTerminated()) return false; // Don't do anything if the game's over

  var cell, tile;

  var vector = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved = false;

  // Save the current tile positions and remove merger information
  this.prepareTiles();

  // Traverse the grid in the right direction and move tiles
  traversals.x.forEach(function(x) {
    traversals.y.forEach(function(y) {
      cell = {x: x, y: y};
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next = self.grid.cellContent(positions.next);

        // Only one merger per row traversal?
        if (next && next.value === tile.value && !next.mergedFrom) {
          var merged = new Tile(positions.next, tile.value * 2);
          merged.mergedFrom = [tile, next];

          self.grid.insertTile(merged);
          self.grid.removeTile(tile);

          // Converge the two tiles' positions
          tile.updatePosition(positions.next);

          // Update the score
          self.score += merged.value;

          // The mighty 2048 tile
          if (merged.value === 2048) self.won = true;
        } else {
          self.moveTile(tile, positions.farthest);
        }

        if (!self.positionsEqual(cell, tile)) {
          moved = true; // The tile moved from its original cell!
        }
      }
    });
  });
  return moved;
};