import Grid, { DIRECTION } from './grid';
import Tile, { Position } from './tile';
import Renderer from './renderer';
import InputManager, { EVENTS } from './input-manager';

export default class GameManager {
  constructor(size, gameArea) {
    this.score = 0;
    this.grid = new Grid(size);
    this.won = false;
    this.inputManager = new InputManager();
    this.renderer = new Renderer(this.grid);
    this.gameAreaHTML = document.querySelector('div.tile-area');
    this.addRandomTile = this.addRandomTile.bind(this);

    // Pass in methods from this class
    this.inputManager.on(EVENTS.MOVE, this.onMove.bind(this));
    this.inputManager.on(EVENTS.RESTART, this.onRestart.bind(this));

    this.addRandomTile();
    this.addRandomTile();
  }

  /**
   * Move and merge tiles to specified direction
   * @param direction diretion to move and merge tiles
   */

  onMove(direction) {
    let moved = false;

    switch (direction) {
      case DIRECTION.UP:
        moved = this.moveUp();
        break;
      case DIRECTION.DOWN:
        moved = this.moveDown();
        break;
      case DIRECTION.LEFT:
        moved = this.moveLeft();
        break;
      case DIRECTION.RIGHT:
        moved = this.moveRight();
        break;
      default:
        break;
    }
    this.renderer.render();
    if (moved) {
      setTimeout(this.addRandomTile, 100);
    }
  }

  moveUp() {
    let moved = false;

    this.grid.eachColumn(column => {
      if (!column) return;

      let availableY = 0;
      let lastTile = null;

      for (let i = 0; i < this.grid.size; i += 1) {
        if (!column[i]) continue;

        const currentTile = column[i];

        if (lastTile && lastTile.value === currentTile.value) {
          this.merge(lastTile, currentTile);
          moved = true;
          lastTile = null;
        } else {
          lastTile = currentTile;
          if (currentTile.position.y !== availableY) {
            moved = true;
            this.grid.moveTile(
              currentTile,
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
    return moved;
  }

  moveDown() {
    let moved = false;
    this.grid.eachColumn(column => {
      if (!column) return;

      let availableY = this.grid.size - 1;
      let lastTile = null;

      for (let i = this.grid.size - 1; i >= 0; i -= 1) {
        if (!column[i]) continue;

        const currentTile = column[i];

        if (lastTile && lastTile.value === currentTile.value) {
          this.merge(lastTile, currentTile);
          moved = true;
          lastTile = null;
        } else {
          lastTile = currentTile;
          if (currentTile.position.y !== availableY) {
            moved = true;
            this.grid.moveTile(
              currentTile,
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
    return moved;
  }

  moveLeft() {
    let moved = false;
    this.grid.eachRow(row => {
      if (!row) return;

      let availableX = 0;
      let lastTile = null;

      for (let i = 0; i < this.grid.size; i += 1) {
        if (!row[i]) continue;

        const currentTile = row[i];

        if (lastTile && lastTile.value === currentTile.value) {
          this.merge(lastTile, currentTile);
          moved = true;
          lastTile = null;
        } else {
          lastTile = currentTile;
          if (currentTile.position.x !== availableX) {
            moved = true;
            this.grid.moveTile(
              currentTile,
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
    return moved;
  }

  moveRight() {
    let moved = false;
    this.grid.eachRow(row => {
      if (!row) return;

      let availableX = this.grid.size - 1;
      let lastTile = null;

      for (let i = this.grid.size - 1; i >= 0; i -= 1) {
        if (!row[i]) continue;

        const currentTile = row[i];

        if (lastTile && lastTile.value === currentTile.value) {
          this.merge(lastTile, currentTile);
          moved = true;
          lastTile = null;
        } else {
          lastTile = currentTile;
          if (currentTile.position.x !== availableX) {
            moved = true;
            this.grid.moveTile(
              currentTile,
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
    return moved;
  }

  merge(tile, other) {
    const mergeValue = tile.value * 2;
    if (mergeValue === 2048) { this.won = true };
    this.score += mergeValue;

    this.grid.removeTile(tile.position.x, tile.position.y);
    this.grid.removeTile(other.position.x, other.position.y);

    const merged = new Tile(tile.position, mergeValue, this.gameAreaHTML)
    merged.setMergedFrom(tile, other);
    merged.requestAnimation();
    this.grid.insertTile(merged);

    this.renderer.renderScore(this.score);
  }

  onRestart() {
  }

  addRandomTile() {
    if (!this.grid.isFull()) {
      let value = Math.random() < 0.9 ? 2 : 4;
      let tile = new Tile(
        this.grid.getRandomUnusedTile(),
        value,
        this.gameAreaHTML
      );
      this.grid.insertTile(tile);
    }
  }
}
