class GameManager {
  constructor(size, inputManager, renderer) {
    this.score = 0;
    this.grid = new Grid(size);
    this.won = false;
    this.inputManager = inputManager;
    this.renderer = renderer;

    // Pass in methods from this class
    // this.inputManager.on('move', this.onMove.bind(this));
    // this.inputManager.on('restart', this.onRestart.bind(this));
    //
    this.addRandomTile();
    this.addRandomTile();

    this.grid.debug()
    this.onMove(DIRECTION.UP);
    console.log('onMove done')
    this.grid.debug()
  }

  onMove(direction) {
    this.squeeze(direction);
    this.merge(direction);
    this.squeeze(direction);
    this.addRandomTile();
  }

  merge(direction) {
    if (direction === DIRECTION.UP || direction === DIRECTION.DOWN) {
      this.mergeVertical();
    }
    else {
      this.mergeHorizontal();
    }
  }

  mergeVertical() {
    this.grid.eachColumn( column => {
      if (column) {
        for (let i = 1; i < column.length; i += 1) {
          if (column[i-1] && column[i]
            && column[i-1].value === column[i].value) {
            const merged = new Tile(column[i-1].position, column[i-1].value * 2)
            this.grid.insertTile(merged)
            this.grid.removeTile(column[i].position.x, column[i].position.y);
            i += 1;
          }
        }
      }
    });
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
    this.grid.eachColumn(column => {
      let pos = 0;
      column.forEach(tile => {
        if (tile) {
          if (tile.position.y !== pos) {
            this.grid.moveTile(tile.position, new Position(tile.position.x, pos));
          }
          pos += 1;
        }
      })
    });
  }

  onRestart() {
  }

  addRandomTile() {
    if (!this.grid.isFull()) {
      let value = Math.random() < 0.9 ? 2 : 4;
      let tile = new Tile(this.grid.getRandomUnusedTile(), value);
      this.grid.insertTile(tile);
    }
  }
}
