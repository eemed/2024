import { getColor, Position } from './tile';

const CSS_TILE_CLASS = "tile";
const TILE_SIZE = 105;

export default class Renderer {
  constructor(grid) {
    this.grid = grid;
    this.scoreDisplay = document.querySelector('#score-display');
  }

  renderScore(score) {
    this.scoreDisplay.querySelector('#score').innerHTML = score;
  }

  render() {
    for (let i = 0; i < this.grid.size ** 2; ++i) {
      let tile = this.grid.getTile(i);
      if (tile) {
        tile.render();
      }
    }
  }

  setValue(gridTile) {
      if (gridTile) {
        gridTile.html.querySelector('value').innerHTML = value;
      }
  }

  setColor(htmlTile, gridTile) {
      if (gridTile) {
        const color = getColor(gridTile.value);
        gridTile.html.style.background = color;
      } 
  }

  moveTile(htmlTile, gridTile) {
    if (gridTile && gridTile.prevPosition !== null) {
      this.animate(htmlTile, gridTile)
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
