import Grid, { DIRECTION } from './grid';
import Tile, { Position } from './tile';

export default class GameManager {
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

    this.grid.debug();
    this.onMove(DIRECTION.UP);
    console.log('onMove done')
    this.grid.debug()
  }

  onMove(direction) {
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
    this.grid.eachColumn(column => {
      if (column) {
        let last = column[0];

        for (let i = 1; i < column.length; i += 1) {
          if (column[i]) {
            if (last && column[i].value === last.value) {

              const merged = new Tile(
                last.position.x,
                last.position.y,
                last.value * 2
              );

              this.grid.insertTile(merged);
              this.grid.removeTile(
                column[i].position.x,
                column[i].position.y
              );
            }
            else {
              last = column[i];
            }
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
        this.squeezeDown();
        break;

      case DIRECTION.LEFT:
        this.squeezeLeft();
        break;

      case DIRECTION.RIGHT:
        this.squeezeRight();
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
