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
      if (tile && tile.needsAnimation) {
        if (tile.didMerge()) {
          this.animate({
            progress: tile.progressMerge,
            draw: tile.drawMerge,
            post: tile.postMerge,
            duration: 150,
          });
        } else {
          this.animate({
            progress: tile.progress,
            draw: tile.draw,
            post: tile.post,
            duration: 150,
          });
        }
      }
    }
  }

  animate({progress, draw, post, duration}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // calculate the current animation state
      let progressData = progress(timeFraction)

      draw(progressData); // draw it

      if (timeFraction === 1) {
        post();
      }

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }

    });
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
}
