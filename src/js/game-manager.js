import Grid, { DIRECTION } from './grid';
import Tile, { Position } from './tile';
import Renderer from './renderer';
import InputManager, { EVENTS } from './input-manager';

export default class GameManager {
  constructor(size) {
    this.score = 0;
    this.grid = new Grid(size);
    this.won = false;
    this.inputManager = new InputManager();
    this.renderer = new Renderer(this.grid);

    // Pass in methods from this class
    this.inputManager.on(EVENTS.MOVE, this.onMove.bind(this));
    this.inputManager.on(EVENTS.RESTART, this.onRestart.bind(this));
    //
    this.addRandomTile();
    this.addRandomTile();

    // this.grid.debug();
    // this.onMove(DIRECTION.RIGHT);
    // console.log('--')
    // this.grid.debug()
    this.renderer.render();
  }

  /**
   * Move and merge tiles to specified direction
   * @param direction diretion to move and merge tiles
   */

  onMove(direction) {
    switch (direction) {
      case DIRECTION.UP:
        this.moveUp();
        break;
      case DIRECTION.DOWN:
        this.moveDown();
        break;
      case DIRECTION.LEFT:
        this.moveLeft();
        break;
      case DIRECTION.RIGHT:
        this.moveRight();
        break;
      default:
        break;
    }
    this.addRandomTile();
    this.renderer.render();
  }

  moveUp() {
    this.grid.eachColumn(column => {
      if (!column) return;

      let availableY = 0;
      let lastTile = null;

      for (let i = 0; i < this.grid.size; i += 1) {
        if (!column[i]) continue;

        const currentTile = column[i];

        if (lastTile && lastTile.value === currentTile.value) {
          this.merge(lastTile, currentTile);
          lastTile = null;
        } else {
          lastTile = currentTile;
          if (currentTile.position.y !== availableY) {
            this.grid.moveTile(
              currentTile.position,
              new Position(
                currentTile.position.x,
                availableY
              )
            );
          }
          availableY += 1;
        }
      }
    });
  }

  moveDown() {
    this.grid.eachColumn(column => {
      if (!column) return;

      let availableY = this.grid.size - 1;
      let lastTile = null;

      for (let i = this.grid.size - 1; i >= 0; i -= 1) {
        if (!column[i]) continue;

        const currentTile = column[i];

        if (lastTile && lastTile.value === currentTile.value) {
          this.merge(lastTile, currentTile);
          lastTile = null;
        } else {
          lastTile = currentTile;
          if (currentTile.position.y !== availableY) {
            this.grid.moveTile(
              currentTile.position,
              new Position(
                currentTile.position.x,
                availableY
              )
            );
          }
          availableY -= 1;
        }
      }
    });
  }

  moveLeft() {
    this.grid.eachRow(row => {
      if (!row) return;

      let availableX = 0;
      let lastTile = null;

      for (let i = 0; i < this.grid.size; i += 1) {
        if (!row[i]) continue;

        const currentTile = row[i];

        if (lastTile && lastTile.value === currentTile.value) {
          this.merge(lastTile, currentTile);
          lastTile = null;
        } else {
          lastTile = currentTile;
          if (currentTile.position.x !== availableX) {
            this.grid.moveTile(
              currentTile.position,
              new Position(
                availableX,
                currentTile.position.y
              )
            );
          }
          availableX += 1;
        }
      }
    });
  }

  moveRight() {
    this.grid.eachRow(row => {
      if (!row) return;

      let availableX = this.grid.size - 1;
      let lastTile = null;

      for (let i = this.grid.size - 1; i >= 0; i -= 1) {
        if (!row[i]) continue;

        const currentTile = row[i];

        if (lastTile && lastTile.value === currentTile.value) {
          this.merge(lastTile, currentTile);
          lastTile = null;
        } else {
          lastTile = currentTile;
          if (currentTile.position.x !== availableX) {
            this.grid.moveTile(
              currentTile.position,
              new Position(
                availableX,
                currentTile.position.y
              )
            );
          }
          availableX -= 1;
        }
      }
    });
  }

  merge(tile, other) {
    const mergeValue = tile.value * 2;
    if (mergeValue === 2048) { this.won = true };
    this.score += mergeValue;
    this.grid.removeTile(other.position.x, other.position.y);
    this.grid.insertTile(new Tile(tile.position, mergeValue));
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
