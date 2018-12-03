class GameManager {
  constructor(size, inputManager, renderer) {
    this.score = 0;
    this.grid = new Grid(size);
    this.won = false;
    this.inputManager = inputManager;
    this.renderer = renderer;

    // Pass in methods from this class
    this.inputManager.on('move', this.onMove.bind(this));
    this.inputManager.on('restart', this.onRestart.bind(this));
  }

  onMove() {
  }

  onRestart() {
  }

  addRandomTile() {
    if (!this.grid.isFull()) {
      let value = Math.random() < 0.9 ? 2 : 4;
      let tile = new Tile(this.getRandomUnusedTile(), value);
      this.grid.insertTile(tile);
    }
  }
}
