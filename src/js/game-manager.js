import Grid, { DIRECTION } from './grid';
import Tile, { Position } from './tile';
import Renderer from './renderer';
import InputManager, { EVENTS } from './input-manager';

const STATE = { INPROGRESS: 2, INMENU: 3 };
const GAME_STATE = { LOST: 0, WON: 1, NEUTRAL: 2 };
const MESSAGES = { LOSE: 'Game Over!', PLAY_AGAIN: 'Play again?' };
const MENU_TEXT_CSS_CLASS = 'menu-text';
const MENU_BUTTON_CSS_CLASS = 'menu-button';

export default class GameManager {
  constructor(size) {
    this.score = 0;
    this.grid = new Grid(size);
    this.state = STATE.INMENU;
    this.gameState = GAME_STATE.NEUTRAL;
    this.inputManager = new InputManager();
    this.renderer = new Renderer(this.grid);
    this.gameAreaHTML = document.querySelector('div.tile-area');
    this.addRandomTile = this.addRandomTile.bind(this);

    // Pass in methods from this class
    this.onRestart = this.onRestart.bind(this);
    this.onMove = this.onMove.bind(this);

    this.inputManager.on(EVENTS.MOVE, this.onMove);
    this.inputManager.on(EVENTS.RESTART, this.onRestart);
    this.inputManager.onClick('#restart-button', this.onRestart);

    this.startGame();
    this.renderLose();
  }

  /**
   * Move and merge tiles to specified direction
   * @param direction diretion to move and merge tiles
   */

  onMove(direction) {
    if (this.state === STATE.INMENU) { return; }
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

    this.grid.eachColumn((column) => {
      if (!column) return;

      let availableY = 0;
      let lastTile = null;

      for (let i = 0; i < this.grid.size; i += 1) {
        if (column[i]) {
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
                  availableY,
                ),
              );
            }
            availableY += 1;
          }
        }
      }
    });
    return moved;
  }

  moveDown() {
    let moved = false;
    this.grid.eachColumn((column) => {
      if (!column) return;

      let availableY = this.grid.size - 1;
      let lastTile = null;

      for (let i = this.grid.size - 1; i >= 0; i -= 1) {
        if (column[i]) {
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
                  availableY,
                ),
              );
            }
            availableY -= 1;
          }
        }
      }
    });
    return moved;
  }

  moveLeft() {
    let moved = false;
    this.grid.eachRow((row) => {
      if (!row) return;

      let availableX = 0;
      let lastTile = null;

      for (let i = 0; i < this.grid.size; i += 1) {
        if (row[i]) {
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
                  currentTile.position.y,
                ),
              );
            }
            availableX += 1;
          }
        }
      }
    });
    return moved;
  }

  moveRight() {
    let moved = false;
    this.grid.eachRow((row) => {
      if (!row) return;

      let availableX = this.grid.size - 1;
      let lastTile = null;

      for (let i = this.grid.size - 1; i >= 0; i -= 1) {
        if (row[i]) {
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
                  currentTile.position.y,
                ),
              );
            }
            availableX -= 1;
          }
        }
      }
    });
    return moved;
  }

  merge(tile, other) {
    const mergeValue = tile.value * 2;
    if (mergeValue === 2048) { this.gameState = GAME_STATE.WON; }
    this.score += mergeValue;

    this.grid.removeTile(tile.position.x, tile.position.y);
    this.grid.removeTile(other.position.x, other.position.y);

    const merged = new Tile(tile.position, mergeValue, this.gameAreaHTML);
    merged.setMergedFrom(tile, other);
    merged.requestAnimation();
    this.grid.insertTile(merged);

    this.renderer.renderScore(this.score);
  }

  onRestart() {
    this.renderer.removeMenus();

    // Arrowfunction takes this from here
    this.grid.eachTile((x, y, tile) => {
      if (!tile) { return; }
      tile.removeHTML();

      this.grid.removeTile(x, y);
    });

    this.startGame();
  }

  startGame() {
    // Start a new game
    this.gameState = GAME_STATE.NEUTRAL;
    this.state = STATE.INPROGRESS;
    this.score = 0;
    this.renderer.renderScore(this.score);
    this.addRandomTile();
    this.addRandomTile();
  }

  addRandomTile() {
    if (!this.grid.isFull()) {
      const value = Math.random() < 0.9 ? 2 : 4;
      const tile = new Tile(
        this.grid.getRandomUnusedTile(),
        value,
        this.gameAreaHTML,
      );
      this.grid.insertTile(tile);

      this.checkMovement();
    }
  }

  checkMovement() {
    if (!this.grid.isFull()) { return; }

    let isLost = true;

    this.grid.eachTile((x, y, tile) => {
      if (!isLost) { return; }
      const adjacentTiles = this.grid.getAdjacentTiles(tile);
      for (let i = 0; i < adjacentTiles.length; i += 1) {
        if (adjacentTiles[i].value === tile.value) {
          isLost = false;
          break;
        }
      }
    });

    if (isLost) {
      this.renderLose();
    }
  }

  continueGame() {
    this.renderer.removeMenus();
    this.state = STATE.NEUTRAL;
  }

  renderLose() {
    this.gameState = GAME_STATE.LOST;
    this.state = STATE.INMENU;

    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.justifyContent = 'center';

    const p = document.createElement('p');
    p.className = MENU_TEXT_CSS_CLASS;
    p.innerHTML = MESSAGES.LOSE;

    const button = document.createElement('button');
    button.className = MENU_BUTTON_CSS_CLASS;
    button.innerHTML = MESSAGES.PLAY_AGAIN;

    div.appendChild(p);
    div.appendChild(button);

    this.renderer.renderMenu(div);

    this.inputManager.onClick('.menu-button', this.onRestart);
  }
}
