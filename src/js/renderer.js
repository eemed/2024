import { getColor, Position } from './tile';

const CSS_TILE_CLASS = "tile";
const TILE_SIZE = 105;

export default class Renderer {
  constructor(grid) {
    this.grid = grid;
    this.scoreDisplay = document.querySelector('.score-display');
  }

  render() {
    let tiles = document.querySelectorAll('.tile');
    if (tiles.length !== this.grid.size ** 2) { 
      console.error(tiles.length , '!==', this.grid.size ** 2, 'The amount of tiles doesnt match grid. Cannot render.')
      return;
    }

    let position = new Position(0, 0);

    for (let i = 0; i < this.grid.size ** 2; ++i) {
      // TODO match tiles to html tiles
      const htmlTile = tiles[i];
      const gridTile = this.grid.getTile(i);
      this.moveTile(htmlTile, gridTile);
      this.setValue(htmlTile, gridTile);
      this.setColor(htmlTile, gridTile);
    }
  }

  setValue(htmlTile, gridTile) {
      if (gridTile) {
        htmlTile.querySelector('.value').innerHTML = gridTile.value;
      } else {
        htmlTile.querySelector('.value').innerHTML = "";
      }
  }

  setColor(htmlTile, gridTile) {
      if (gridTile) {
        const color = getColor(gridTile.value);
        htmlTile.style.background = color;
      } else {
        htmlTile.style.background = getColor()
      }
  }

  moveTile(htmlTile, gridTile) {
    if (gridTile && gridTile.prevPosition !== null) {
      this.animate(htmlTile, gridTile)
    }

    position.x += TILE_SIZE;
    if (position.x > TILE_SIZE * this.grid.size - 1) {
      position.y += TILE_SIZE;
      position.x = 0;
    }
  }

  animate(htmlTile, gridTile) {
    if (!gridTile.prevPosition) { return; }

    let positionCopy = {};
    Object.assign(positionCopy, gridTile.position);

    let id = setInterval(frame, 5);

    let currentPos = gridTile.prevPosition;

    function frame() {
      if (currentPos.x === positionCopy.x && currentPos.y === positionCopy.y) {
        clearInterval(id);
      } else if (currentPos.x > positionCopy.x) {
        currentPos.x -= 1;
      } else if (currentPos.x < positionCopy.x) {
        currentPos.x += 1;
      } else if (currentPos.y > positionCopy.y) {
        currentPos.x -= 1;
      } else if (currentPos.y < positionCopy.y) {
        currentPos.y += 1;
      }

      htmlTile.style.top = currentPos.y + "px";
      htmlTile.style.left = currentPos.x + "px";
    }
  }
}
