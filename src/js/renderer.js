const SCORE_DISPLAY_ID = "score-display";
const TILE_AREA_CLASS = "tile-area";
const SCORE_ID = "score";
const MENU_OPACITY = 0.8;
const MENU_CSS_CLASS = "menu";

export default class Renderer {
  constructor(grid) {
    this.grid = grid;
    this.scoreDisplay = document.querySelector('#' + SCORE_DISPLAY_ID);
    this.tileArea = document.querySelector('.' + TILE_AREA_CLASS)
  }

  renderScore(score) {
    this.scoreDisplay.querySelector('#' + SCORE_ID).innerHTML = score;
  }

  render() {
    for (let i = 0; i < this.grid.size ** 2; ++i) {
      let tile = this.grid.getTile(i);
      if (tile && tile.needsAnimation) {
        if (tile.didMerge()) {
          this.animate({
            pre: tile.preMerge,
            progress: tile.progressMerge,
            draw: tile.drawMerge,
            post: tile.postMerge,
            duration: 150,
          });
        } else {
          this.animate({
            pre: () => 0,
            progress: tile.progress,
            draw: tile.draw,
            post: tile.post,
            duration: 150,
          });
        }
      }
    }
  }

  renderMenu(element) {
    let div = document.createElement('div');
    div.className = MENU_CSS_CLASS;

    div.appendChild(element);

    this.tileArea.appendChild(div);
  }

  removeMenus() {
    let menus = document.querySelectorAll('.' + MENU_CSS_CLASS);
    menus.forEach(menu => { 

      function progress(time) {
        if (MENU_OPACITY - time <  0) {
          return 0;
        }
        return (MENU_OPACITY - time).toFixed(2);
      }

      function draw(prog) {
        menu.style.opacity = prog;
      }

      function post() {
        menu.remove();
      }

      this.animate({
        pre: () => 0,
        post: post,
        progress: progress,
        draw: draw,
        duration: 200
      });
    });

  }

  animate({pre, progress, draw, post, duration}) {

    let start = performance.now();

    pre();

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
}
