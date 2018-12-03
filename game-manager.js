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

  onMove(direction) {
    this.squeeze(direction);
    this.merge(direction);
    this.squeeze(direction);
  }

  squeeze(direction) {
    switch (direction) {
      case DIRECTION.UP:
        this.squeezeUp();
        break;

      case DIRECTION.DOWN:
        break;

      case DIRECTION.LEFT:
        break;

      case DIRECTION.RIGHT:
        break;

      default:
        break;
    }
  }

  squeezeUp() {
    let pos = 0;
    this.grid.eachColumn(column => {
      column.forEach(tile => {
        if (tile && tile.position.y !== pos) {
          this.grid.moveTile(tile.position, new Position(tile.position.x, pos));
        }
        pos += 1;
      })
    });
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
