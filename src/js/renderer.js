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
