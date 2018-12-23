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
    this.move(direction);
    this.addRandomTile();
  }

  merge(direction) {
    switch (direction) {
      case DIRECTION.UP:
        this.mergeUp();
        break;

      case DIRECTION.DOWN:
        this.mergeDown();
        break;

      case DIRECTION.LEFT:
        this.mergeLeft();
        break;

      case DIRECTION.RIGHT:
        this.mergeRight();
        break;

      default:
        break;
    }
  }

  mergeUp(direction) {
    this.grid.eachColumn(column => {
      if (column) {
        let goingUp = direction === DIRECTION.UP;
        let pos = goingUp ? 0 : this.grid.size - 1;
        let last = column[pos];

        for (let i = 1; i < column.length; i += 1) {
          if (column[i]) {
            if (last && column[i].value === last.value) {

              const merged = new Tile(
                new Position(
                  last.position.x,
                  last.position.y),
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

  move(direction) {
    if (direction === DIRECTION.UP || direction === DIRECTION.DOWN) {
        this.moveVertical(direction);
    } else {
        this.moveHorizontal(direction);
    }
  }

  moveVertical(direction) {
    this.grid.eachColumn(column => {
      let goingUp = (direction === DIRECTION.UP);
      let pos =  goingUp ? 0 : this.grid.size - 1;

      for (let i = pos;
        i >= 0 && i < this.grid.size;
        goingUp ? i += 1 : i -= 1) {

        let tile = column[i];
        if (tile) {
          if (tile.position.y !== pos) {
            this.grid.moveTile(
              tile.position,
              new Position(tile.position.x, pos)
            );
          }
        }
        pos += goingUp ? 1 : -1;
      }
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
